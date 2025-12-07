"use client";

import Link from "next/link";

interface Item {
    title: string;
    url: string;
    date?: string;
    isExternal?: boolean;
}

interface RecentSectionProps {
    title: string;
    command: string;
    items: Item[];
    linkText: string;
    linkUrl: string;
}

export default function RecentSection({
    title,
    command,
    items,
    linkText,
    linkUrl,
}: RecentSectionProps) {
    return (
        <section className="font-mono">
            <h2 className="text-2xl font-bold mb-2">
                <span className="text-gray-500">##</span> {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">$ {command}</p>

            <div className="space-y-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
                    >
                        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                            {item.date && <span className="text-gray-500 text-xs">{item.date}</span>}
                            <Link
                                href={item.url}
                                target={item.isExternal ? "_blank" : undefined}
                                className="text-green-700 dark:text-green-400 hover:underline"
                            >
                                {item.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-4 text-sm text-gray-500">
                →{" "}
                <Link href={linkUrl} className="text-green-700 dark:text-green-400 hover:underline">
                    {linkText}
                </Link>
            </p>
        </section>
    );
}
