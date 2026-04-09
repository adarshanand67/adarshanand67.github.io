const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const OUT_DIR = path.join(process.cwd(), "out");
const SW_PATH = path.join(OUT_DIR, "sw.js");

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

if (!fs.existsSync(OUT_DIR)) {
  console.log("Out directory does not exist. Skipping SW generation.");
  process.exit(0);
}

const files = getAllFiles(OUT_DIR);
const manifest = files
  .map((file) => {
    const relativePath = path.relative(OUT_DIR, file);
    // Ignore sw.js, and map files
    if (relativePath === "sw.js" || relativePath.endsWith(".map")) return null;
    return "/" + relativePath; // Ensure leading slash
  })
  .filter(Boolean);

console.log(`Generated manifest with ${manifest.length} files.`);

if (fs.existsSync(SW_PATH)) {
  let swContent = fs.readFileSync(SW_PATH, "utf8");

  // Compute a short content hash from the manifest so the cache name only
  // changes when actual output files change (not every calendar day).
  const manifestString = JSON.stringify(manifest);
  const cacheVersion = crypto
    .createHash("sha256")
    .update(manifestString)
    .digest("hex")
    .slice(0, 10);

  swContent = swContent.replace("__CACHE_VERSION__", cacheVersion);

  const injection = `const __PRECACHE_MANIFEST__ = ${manifestString};\n`;
  fs.writeFileSync(SW_PATH, injection + swContent);
  console.log("Service Worker updated with precache manifest.");
} else {
  console.log("sw.js not found in out directory.");
}
