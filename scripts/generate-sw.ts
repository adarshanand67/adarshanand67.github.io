import fs from "fs";
import path from "path";
import crypto from "crypto";

const OUT_DIR = path.join(process.cwd(), "out");
const SW_PATH = path.join(OUT_DIR, "sw.js");

function getAllFiles(dirPath: string, files: string[] = []): string[] {
  for (const file of fs.readdirSync(dirPath)) {
    const full = path.join(dirPath, file);
    if (fs.statSync(full).isDirectory()) getAllFiles(full, files);
    else files.push(full);
  }
  return files;
}

if (!fs.existsSync(OUT_DIR)) {
  console.log("Out directory does not exist. Skipping SW generation.");
  process.exit(0);
}

const manifest = getAllFiles(OUT_DIR)
  .map((file) => {
    const rel = path.relative(OUT_DIR, file);
    if (rel === "sw.js" || rel.endsWith(".map")) return null;
    return "/" + rel;
  })
  .filter(Boolean) as string[];

console.log(`Generated manifest with ${manifest.length} files.`);

if (!fs.existsSync(SW_PATH)) {
  console.log("sw.js not found in out directory.");
  process.exit(0);
}

const manifestString = JSON.stringify(manifest);
const cacheVersion = crypto.createHash("sha256").update(manifestString).digest("hex").slice(0, 10);
let swContent = fs.readFileSync(SW_PATH, "utf8").replace("__CACHE_VERSION__", cacheVersion);
fs.writeFileSync(SW_PATH, `const __PRECACHE_MANIFEST__ = ${manifestString};\n` + swContent);
console.log("Service Worker updated with precache manifest.");
