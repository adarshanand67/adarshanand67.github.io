```
const skills = [
  // Languages
  "C++",
  "C",
  "Rust",
  "Python",
  "Assembly",
  "TypeScript",
  // Systems
  "Linux Kernel",
  "Windows Internals",
  "Device Drivers",
  "Memory Management",
  "Process Scheduling",
  "IPC & Sockets",
  // Security
  "Intel SGX/TDX",
  "Cryptography",
  "Fuzzing",
  "Sanitizers",
  "Static Analysis",
  // Tools
  "GDB",
  "Valgrind",
  "Perf",
  "Docker",
  "Git",
  // Infra
  "PostgreSQL",
  "Redis",
  "AWS",
  "CI/CD",
  // Web (for balance)
  "React",
  "Next.js",
  "Node.js",
];

export default function TechStack() {
    return (
        <section className="section container mx-auto px-4 mb-16">
            <h2 className="text-3xl font-bold font-mono mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-mono rounded-md border border-zinc-200 dark:border-zinc-700 hover:border-green-500 transition-colors"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    );
}
