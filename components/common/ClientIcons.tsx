"use client";

import { useEffect, useState } from "react";
import { Linkedin, Github, Mail, LucideProps } from "lucide-react";

function useMounted() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
}

function createClientIcon(Icon: React.ComponentType<LucideProps>) {
    return function ClientIcon(props: LucideProps) {
        const mounted = useMounted();
        if (!mounted) return <div className={props.className} aria-hidden="true" />;
        return <Icon {...props} />;
    };
}

export const ClientLinkedin = createClientIcon(Linkedin);
export const ClientGithub = createClientIcon(Github);
export const ClientMail = createClientIcon(Mail);
