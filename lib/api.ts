import { promises as fs } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

// Export types from Prisma
export type { Profile, Experience, Book, Paper, Blog, Entertainment as EntertainmentItem } from "@prisma/client";

export async function getProfile() {
    // Get the first (and only) profile record
    const profile = await prisma.profile.findFirst();
    if (!profile) {
        throw new Error("Profile not found in database");
    }

    // Transform to match the expected format
    return {
        name: profile.name,
        title: profile.title,
        pronouns: profile.pronouns,
        location: profile.location,
        education: profile.education as any,
        socials: {
            linkedin: profile.linkedin,
            github: profile.github,
            email: profile.email,
        },
        bio: {
            short: profile.shortBio,
            paragraphs: profile.bioParagraphs,
        },
    };
}

export async function getExperiences() {
    return prisma.experience.findMany({
        orderBy: { id: 'asc' }
    });
}

export async function getPapers() {
    return prisma.paper.findMany({
        orderBy: { id: 'asc' }
    });
}

export async function getBooks() {
    return prisma.book.findMany({
        orderBy: { id: 'asc' }
    });
}

export async function getBlogs() {
    return prisma.blog.findMany({
        orderBy: { date: 'desc' }
    });
}

export async function getEntertainment() {
    const items = await prisma.entertainment.findMany({
        orderBy: { id: 'asc' }
    });

    // Transform enum values back to match expected format
    return items.map(item => ({
        ...item,
        type: item.type === 'Web_Series' ? 'Web Series' : item.type,
    }));
}

export async function getPost(slug: string): Promise<string | null> {
    try {
        const postsDirectory = path.join(process.cwd(), "posts");
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = await fs.readFile(fullPath, "utf8");
        return fileContents;
    } catch (error) {
        return null;
    }
}
