"use client";

import { useEffect, useState } from "react";
import * as lucideReact from "lucide-react";

function useMounted() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
}

function createClientIcon(Icon: React.ComponentType<lucideReact.LucideProps>) {
    return function ClientIcon(props: lucideReact.LucideProps) {
        const mounted = useMounted();
        if (!mounted) return <div className={props.className} aria-hidden="true" />;
        return <Icon {...props} />;
    };
}

export const ClientLinkedin = createClientIcon(lucideReact.Linkedin);
export const ClientGithub = createClientIcon(lucideReact.Github);
export const ClientMail = createClientIcon(lucideReact.Mail);
