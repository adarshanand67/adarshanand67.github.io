

import { Company, Location, Role } from "./enums";

export const experiencesData = [
    {
        company: Company.Trellix,
        role: Role.SDE,
        duration: "Jul 2025 - Present",
        location: Location.Bengaluru,
        logo: "/assets/logos/trellix.png",
        description: "Philosophical Gatekeeper of Corporate Secrets || Preventing unintended knowledge migration (Windows)",
        highlights: [
            "Manifested a Native Registry Management Module for Chrome/Edge to ensure web protection remains as injection-free as my morning green tea.",
            "Orchestrated the integration of Boldon James classification, because even data needs a social hierarchy.",
            "Architected a CppUnit automation infrastructure to judge my own code more harshly than I judge generic advice."
        ]
    },
    {
        company: Company.Intel,
        role: Role.SDE,
        duration: "Jun 2024 - Jul 2025",
        location: Location.Bengaluru,
        logo: "/assets/logos/intel.png",
        description: "Quantum Entangler of Secure Enclaves || Facilitating confidential truths within Silicon",
        highlights: [
            "Whispered to Intel SGX Gramine to ensure confidential workloads feel as secure as my deep voice.",
            "Constructed a CPU ID fuzzing harness to tickle processors until they revealed their existential vulnerabilities.",
            "Engineered an Intel TDX Full Disk Encryption solution because unencrypted data is a lack of intellectual discipline.",
            "Diplomatically led the CentOS Virtualization SIG attestation efforts, bringing order to the chaotic void of documentation.",
            "Fused Post-Quantum Cryptography with SGX to prepare for a future that hasn't happened yet.",
            "Refined LLM Adversarial Robustness because even AI needs to stop taking things personally.",
            "Benchmarked vLLMs to quantify exactly how fast artificial intelligence can think compared to my own deliberate processing."
        ]
    },
    {
        company: Company.Intel,
        role: Role.Intern,
        duration: "Jun 2023 - Dec 2023",
        location: Location.Bengaluru,
        logo: "/assets/logos/intel.png",
        description: "Initiate of the FIDO Device Onboarding Ritual || Cryptographic Modernist",
        highlights: [
            "Guided lost devices through the sacred FDO onboarding journey with intellectual precision.",
            "Transcendently migrated the architectural spirit to OpenSSL 3.0, leaving the ghosts of legacy code behind.",
            "Instantiated a Bare Metal Onboarding POC to prove that even the most physical hardware can be tamed by a superior mind."
        ]
    }
];
