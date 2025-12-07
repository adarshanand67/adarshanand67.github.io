// Map of technologies to their official websites
export const techLinks: Record<string, string> = {
    // Languages
    "C++": "https://isocpp.org/",
    "Rust": "https://www.rust-lang.org/",
    "Python": "https://www.python.org/",
    "TypeScript": "https://www.typescriptlang.org/",

    // Intel Technologies
    "Intel SGX": "https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html",
    "Intel TDX": "https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html",
    "SGX": "https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html",
    "TDX": "https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html",
    "Gramine": "https://gramineproject.io/",
    "Intel Xeon": "https://www.intel.com/content/www/us/en/products/details/processors/xeon.html",

    // Security & Fuzzing
    "libFuzzer": "https://llvm.org/docs/LibFuzzer.html",
    "AddressSanitizer": "https://clang.llvm.org/docs/AddressSanitizer.html",
    "Address/Memory Sanitizers": "https://clang.llvm.org/docs/AddressSanitizer.html",
    "MemorySanitizer": "https://clang.llvm.org/docs/MemorySanitizer.html",
    "RESTler": "https://github.com/microsoft/restler-fuzzer",
    "OpenSSL": "https://www.openssl.org/",
    "OpenSSL 3.0": "https://www.openssl.org/",
    "LLVM": "https://llvm.org/",

    // AI/ML
    "PyTorch": "https://pytorch.org/",
    "OpenVINO": "https://docs.openvino.ai/",
    "vLLM": "https://vllm.ai/",
    "Deepseek": "https://deepseek.com/",
    "Llama": "https://ai.meta.com/llama/",

    // Databases & Infrastructure
    "MySQL": "https://www.mysql.com/",
    "Redis": "https://redis.io/",
    "Docker": "https://www.docker.com/",
    "Hashicorp Vault": "https://www.vaultproject.io/",

    // Frameworks
    "React": "https://react.dev/",
    "Next.js": "https://nextjs.org/",

    // Linux Distros
    "Ubuntu": "https://ubuntu.com/",
    "CentOS": "https://www.centos.org/",
    "RHEL": "https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux",

    // Other
    "FIDO": "https://fidoalliance.org/",
    "PKCS11": "https://docs.oasis-open.org/pkcs11/pkcs11-base/v2.40/pkcs11-base-v2.40.html",
    "H2": "https://h2database.com/",
};

// Function to add hyperlinks to text
export function linkifyTech(text: string): string {
    let result = text;

    // Sort by length (longest first) to avoid partial matches
    const sortedTechs = Object.keys(techLinks).sort((a, b) => b.length - a.length);

    for (const tech of sortedTechs) {
        const url = techLinks[tech];
        // Use word boundary to avoid partial matches, case insensitive
        const regex = new RegExp(`\\b${tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        result = result.replace(regex, `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-green-700 dark:text-green-400 hover:underline font-medium">$&</a>`);
    }

    return result;
}
