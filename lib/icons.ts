import {
  Code,
  Globe,
  Database,
  Terminal,
  Cpu,
  Shield,
  Layout,
  Server,
  Box,
  Layers,
  FileCode,
  Hash,
  Gamepad2,
  Book,
  Brain,
  Zap,
  Lock,
  Bug,
  Network,
  Cloud,
  Workflow,
  BarChart3,
  Activity,
  HardDrive,
  Package,
  Monitor,
  Fingerprint,
  Key,
  Settings,
} from "lucide-react";

export const getTechIcon = (techName: string) => {
  const n = techName.toLowerCase();

  // Languages
  if (n === "c" || n === "c++") return FileCode;
  if (n.includes("python")) return Hash;
  if (n.includes("javascript") || n.includes("typescript")) return Code;
  if (n.includes("bash") || n.includes("shell") || n.includes("powershell")) return Terminal;
  if (n.includes("rust") || n.includes("go") || n.includes("java")) return FileCode;
  if (n.includes("sql")) return Database;

  // AI/ML
  if (n.includes("pytorch") || n.includes("tensorflow")) return Brain;
  if (n.includes("cuda") || n.includes("gpu")) return Cpu;
  if (n.includes("vllm") || n.includes("llm") || n.includes("hugging")) return Brain;
  if (n.includes("numpy") || n.includes("pandas") || n.includes("scikit")) return BarChart3;
  if (n.includes("mlflow") || n.includes("onnx") || n.includes("openvino")) return Activity;
  if (n.includes("jupyter")) return Book;
  if (n.includes("langchain")) return Zap;

  // Security
  if (n.includes("encryption") || n.includes("cryptograph") || n.includes("fido") || n.includes("vault") || n.includes("openssl")) return Lock;
  if (n.includes("fuzzer") || n.includes("fuzzing") || n.includes("restler") || n.includes("sanitizer")) return Bug;
  if (n.includes("edr") || n.includes("xdr") || n.includes("siem") || n.includes("threat")) return Activity;
  if (n.includes("security") || n.includes("dlp") || n.includes("trellix") || n.includes("endpoint") || n.includes("boldon") || n.includes("seclore")) return Shield;
  if (n.includes("iam") || n.includes("zero trust")) return Key;
  if (n.includes("selinux") || n.includes("apparmor")) return Fingerprint;
  if (n.includes("wireshark") || n.includes("nmap")) return Network;

  // System / Kernel
  if (n.includes("intel") || n.includes("sgx") || n.includes("tdx") || n.includes("gramine")) return Cpu;
  if (n.includes("windows") || n.includes("uefi") || n.includes("bios")) return Monitor;
  if (n.includes("ubuntu") || n.includes("centos") || n.includes("rhel") || n.includes("debian") || n.includes("linux") || n.includes("arch")) return Terminal;
  if (n.includes("system program") || n.includes("kernel")) return Settings;

  // Databases
  if (n.includes("redis") || n.includes("mysql") || n.includes("postgres") || n.includes("mongodb") || n.includes("sqlite") || n.includes("dynamodb") || n.includes("cassandra") || n.includes("neo4j") || n.includes("elasticsearch")) return Database;
  if (n.includes("database") || n.includes("sql")) return Database;

  // Frontend/Web
  if (n.includes("react")) return Globe;
  if (n.includes("next")) return Layout;
  if (n.includes("tailwind") || n.includes("css")) return Layers;
  if (n.includes("framer") || n.includes("three.js")) return Zap;
  if (n.includes("zustand") || n.includes("redux")) return Package;
  if (n.includes("html") || n.includes("webpack") || n.includes("vite")) return Code;
  if (n.includes("radix") || n.includes("shadcn")) return Layout;

  // DevOps/Cloud
  if (n.includes("docker")) return Box;
  if (n.includes("kubernetes") || n.includes("istio") || n.includes("helm") || n.includes("argocd")) return Network;
  if (n.includes("github actions") || n.includes("gitlab ci") || n.includes("jenkins") || n.includes("workflow")) return Workflow;
  if (n.includes("aws") || n.includes("azure") || n.includes("gcp") || n.includes("cloud")) return Cloud;
  if (n.includes("terraform") || n.includes("ansible")) return Settings;
  if (n.includes("prometheus") || n.includes("grafana") || n.includes("elk")) return BarChart3;
  if (n.includes("nginx") || n.includes("apache")) return Server;
  if (n.includes("server") || n.includes("jfrog")) return Server;

  // Misc
  if (n.includes("game") || n.includes("unity")) return Gamepad2;

  return Code;
};
