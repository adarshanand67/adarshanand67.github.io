"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Terminal } from "@/components/layout/terminal";
import { SystemStatus } from "@/components/layout/ui";
import { TiltWrapper } from "@/components/ui/TiltWrapper";
import { siteConfig } from "@/lib/config";
import { ViewToggle } from "./ViewToggle";

interface HeroProps {
    profile: any;
}

export function Hero({ profile }: HeroProps) {
    const [viewMode, setViewMode] = useState<'profile' | 'terminal'>('profile');
    const [copied, setCopied] = useState(false);

    return (
        <section
            id="hero"
            className="section max-w-6xl mx-auto px-4 md:px-6 mt-8 mb-8 relative"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
            }}
        >
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div
                    className="absolute inset-0 opacity-30 dark:opacity-20 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 197, 94, 0.15) 0%, transparent 50%)`
                    }}
                />
            </div>

            <div className="relative z-10 min-h-[500px]">
                {viewMode === 'profile' && (
                    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 glass p-6 sm:p-8 rounded-2xl animate-fade-in relative">
                        <div className="flex items-start justify-between mb-2">
                            <div className="font-mono flex items-center gap-2 group mt-1">
                                <span className="text-gray-500 dark:text-gray-400 text-sm tracking-wider uppercase">whoami</span>
                            </div>
                            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            {profile.avatar && (
                                <TiltWrapper intensity={20} className="shrink-0">
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/50 to-emerald-500/50 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-green-500/30 dark:border-emerald-500/20 shadow-xl shadow-green-500/10 flex-shrink-0">
                                            <Image
                                                src={profile.avatar}
                                                alt={profile.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </TiltWrapper>
                            )}
                            <div className="text-center md:text-left flex-1">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold title-gradient mb-4 tracking-tight">
                                    {profile.name}
                                </h1>
                                <SystemStatus />
                            </div>
                        </div>

                        <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed space-y-4 mt-6 max-w-3xl">
                            {profile.bio.paragraphs.map((paragraph: string, index: number) => (
                                <p
                                    key={index}
                                    dangerouslySetInnerHTML={{
                                        __html: paragraph
                                            .replace(/Trellix/g, `<a href="https://trellix.com" target="_blank" class="text-green-700 dark:text-green-400 hover:underline font-semibold transition-colors">Trellix</a>`)
                                            .replace(/Intel Corporation/g, `<a href="https://intel.com" target="_blank" class="text-green-700 dark:text-green-400 hover:underline font-semibold transition-colors">Intel Corporation</a>`),
                                    }}
                                />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-8">
                            <Link href={`https://${siteConfig.contact.linkedin}`} target="_blank" className="group relative overflow-hidden glass hover:bg-white dark:hover:bg-white/5 rounded-2xl p-5 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1.5 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="shrink-0 w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-green-500/20">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] text-green-600 dark:text-green-400 font-black uppercase tracking-[0.1em] mb-1">Connect</div>
                                        <div className="text-sm text-gray-900 dark:text-white font-bold truncate">LinkedIn</div>
                                    </div>
                                </div>
                            </Link>

                            <div onClick={() => { navigator.clipboard.writeText(siteConfig.contact.email); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="group relative overflow-hidden glass hover:bg-white dark:hover:bg-white/5 rounded-2xl p-5 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1.5 border border-gray-100 dark:border-white/5 cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="shrink-0 w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg shadow-green-500/20">
                                        {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] text-green-600 dark:text-green-400 font-black uppercase tracking-[0.1em] mb-1">{copied ? "Copied!" : "Say Hello"}</div>
                                        <div className="text-sm text-gray-900 dark:text-white font-bold truncate">Email Address</div>
                                    </div>
                                </div>
                            </div>

                            <Link href={`https://${siteConfig.contact.github}`} target="_blank" className="group relative overflow-hidden glass hover:bg-white dark:hover:bg-white/5 rounded-2xl p-5 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1.5 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="shrink-0 w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-green-500/20">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] text-green-600 dark:text-green-400 font-black uppercase tracking-[0.1em] mb-1">Codebase</div>
                                        <div className="text-sm text-gray-900 dark:text-white font-bold truncate">GitHub</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
                {viewMode === 'terminal' && (
                    <div className="w-full max-w-5xl mx-auto animate-fade-in relative">
                        <div className="absolute top-0 right-0 z-20 p-4">
                            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                        </div>
                        <Terminal />
                    </div>
                )}
            </div>
        </section>
    );
}
