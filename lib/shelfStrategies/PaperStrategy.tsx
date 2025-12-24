"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Paper } from "@/types/definitions";
import { ShelfItemStrategy } from "./types";

export class PaperListStrategy implements ShelfItemStrategy<Paper> {
    renderItem(paper: Paper, index: number): ReactNode {
        return (
            <div
                id={`shelf-item-${paper.title}`}
                key={index}
                className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
            >
                <Link
                    href={paper.url}
                    target="_blank"
                    className="text-green-700 dark:text-green-400 hover:underline"
                >
                    {paper.title}
                </Link>
            </div>
        );
    }
    renderList(items: Paper[]): ReactNode {
        if (items.length === 0) return null;
        return (
            <div className="space-y-4">{items.map((paper, index) => this.renderItem(paper, index))}</div>
        );
    }
    filter(items: Paper[], query: string): Paper[] {
        if (!query) return items;
        return items.filter((paper) => paper.title.toLowerCase().includes(query.toLowerCase()));
    }
}
