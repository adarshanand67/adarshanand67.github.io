/**
 * @fileoverview Markdown parser - extracts frontmatter from markdown files.
 */

import { logError } from "@/lib/utils/errorHandling";

/**
 * Parses frontmatter from markdown content.
 * Extracts YAML frontmatter between --- delimiters and returns data + content.
 *
 * @param {string} content - Raw markdown content with frontmatter
 * @returns {Object} Parsed frontmatter data and remaining content
 * @returns {Record<string, string>} returns.data - Frontmatter key-value pairs
 * @returns {string} returns.content - Markdown content without frontmatter
 *
 * @example
 * ```ts
 * const { data, content } = parseFrontmatter(`---
 * title: My Post
 * date: 2024-01-01
 * ---
 * # Content here`);
 * // data = { title: "My Post", date: "2024-01-01" }
 * // content = "# Content here"
 * ```
 */
export const parseFrontmatter = (content: string) => {
    try {
        // Validate input
        if (!content || typeof content !== "string") {
            logError(new Error("Invalid content provided to parseFrontmatter"), {
                contentType: typeof content,
            });
            return { data: {}, content: "" };
        }

        const match = /---\s*([\s\S]*?)\s*---/.exec(content);

        if (!match) {
            // No frontmatter found, return content as-is
            return { data: {}, content };
        }

        const data: Record<string, string> = {};
        const frontmatterContent = match[1];

        if (frontmatterContent) {
            frontmatterContent.split("\n").forEach((line) => {
                try {
                    const [k, ...v] = line.split(": ");
                    if (k && k.trim()) {
                        data[k.trim()] = v
                            .join(": ")
                            .trim()
                            .replace(/^['"](.*)['"]$/, "$1");
                    }
                } catch (error) {
                    // Skip invalid lines
                    logError(error as Error, { line, function: "parseFrontmatter.line" });
                }
            });
        }

        const contentWithoutFrontmatter = content.replace(/---\s*([\s\S]*?)\s*---/, "").trim();

        return { data, content: contentWithoutFrontmatter };
    } catch (error) {
        logError(error as Error, { function: "parseFrontmatter" });
        return { data: {}, content };
    }
};
