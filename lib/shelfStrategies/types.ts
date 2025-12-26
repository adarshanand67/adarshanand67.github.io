import { ReactNode } from "react";
import { Book, Paper, AnimeItem, Blog, Hobby } from "@/types/definitions";

export type ShelfItem = Book | Paper | AnimeItem | Blog | Hobby;

export interface ShelfItemStrategy<T> {
    renderItem(item: T, index: number): ReactNode;
    renderList(items: T[]): ReactNode;
    filter(items: T[], query: string): T[];
}
