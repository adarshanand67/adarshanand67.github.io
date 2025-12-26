/**
 * @fileoverview Content API - data fetching functions for all content types.
 * Provides async functions to retrieve profile, experiences, papers, books, anime, and articles.
 */

import { profileData, experiencesData, papersData, booksData, anime, hobbyData } from "@/data";
import { AnimeItem, AnimeType, WatchStatus } from "@/types/definitions";
import { getBlogs } from "./blogs";
import { logError, AppError } from "@/lib/utils/errorHandling";

/** Fetches profile data with error handling. */
export const getProfile = async () => {
    try {
        if (!profileData) {
            throw new AppError("Profile data not found", "PROFILE_NOT_FOUND");
        }
        return profileData;
    } catch (error) {
        logError(error as Error, { function: "getProfile" });
        throw error;
    }
};

/** Fetches work experience data with error handling. */
export const getExperiences = async () => {
    try {
        if (!experiencesData || !Array.isArray(experiencesData)) {
            throw new AppError("Experience data not found or invalid", "EXPERIENCE_NOT_FOUND");
        }
        return experiencesData;
    } catch (error) {
        logError(error as Error, { function: "getExperiences" });
        throw error;
    }
};

/** Fetches research papers data with error handling. */
export const getPapers = async () => {
    try {
        if (!papersData || !Array.isArray(papersData)) {
            throw new AppError("Papers data not found or invalid", "PAPERS_NOT_FOUND");
        }
        return papersData;
    } catch (error) {
        logError(error as Error, { function: "getPapers" });
        throw error;
    }
};

/** Fetches books data with error handling. */
export const getBooks = async () => {
    try {
        if (!booksData || !Array.isArray(booksData)) {
            throw new AppError("Books data not found or invalid", "BOOKS_NOT_FOUND");
        }
        return booksData;
    } catch (error) {
        logError(error as Error, { function: "getBooks" });
        throw error;
    }
};

/** Fetches projects data (currently empty). */
export const getProjects = async () => {
    try {
        return [];
    } catch (error) {
        logError(error as Error, { function: "getProjects" });
        return [];
    }
};

/** Fetches hobby data with error handling. */
export const getHobby = async () => {
    try {
        if (!hobbyData || !Array.isArray(hobbyData)) {
            throw new AppError("Hobby data not found or invalid", "HOBBY_NOT_FOUND");
        }
        return hobbyData;
    } catch (error) {
        logError(error as Error, { function: "getHobby" });
        throw error;
    }
};

/**
 * Fetches anime/movie data with proper type casting and error handling.
 * @returns {Promise<AnimeItem[]>} Array of anime items
 */
export const getAnime = async (): Promise<AnimeItem[]> => {
    try {
        if (!anime || !Array.isArray(anime)) {
            throw new AppError("Anime data not found or invalid", "ANIME_NOT_FOUND");
        }

        return (anime as AnimeItem[]).map((item, index) => {
            if (!item || typeof item !== "object") {
                logError(new Error(`Invalid anime item at index ${index}`), { item });
                throw new AppError(`Invalid anime item at index ${index}`, "INVALID_ANIME_ITEM");
            }

            return {
                ...item,
                type: item.type as AnimeType,
                status: item.status as WatchStatus,
                image: item.image || "/placeholder.png",
                seasons: item.seasons,
                recommended: item.recommended ?? false,
                description: item.description || "",
                tags: item.tags || [],
                year: item.year,
                rating: item.rating,
            };
        });
    } catch (error) {
        logError(error as Error, { function: "getAnime" });
        throw error;
    }
};

/**
 * Fetches all articles (blogs + papers combined) with error handling.
 * @returns {Promise<Array>} Combined array of blogs and papers
 */
export const getArticles = async () => {
    try {
        const [blogs, papers] = await Promise.all([
            getBlogs().catch((error) => {
                logError(error, { function: "getArticles", source: "getBlogs" });
                return []; // Return empty array if blogs fail
            }),
            getPapers().catch((error) => {
                logError(error, { function: "getArticles", source: "getPapers" });
                return []; // Return empty array if papers fail
            }),
        ]);

        return [...papers, ...blogs];
    } catch (error) {
        logError(error as Error, { function: "getArticles" });
        throw error;
    }
};
