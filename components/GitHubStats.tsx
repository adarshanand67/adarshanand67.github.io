
import { getGithubRepos } from "@/lib/github";
import { Star, GitFork, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

export default async function GitHubStats() {
    const repos = await getGithubRepos();

    if (repos.length === 0) return null;

    return (
        <div className="section container mx-auto px-4 mb-24">
            <SectionHeader
                title="Open Source"
                subtitle="My top GitHub repositories and contributions."
                linkText="View GitHub"
                linkHref="https://github.com/adarshanand67"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo) => (
                    <Link
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        className="group block h-full"
                    >
                        <div className="h-full p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-green-500 dark:hover:border-green-500 transition-colors flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-lg group-hover:text-green-600 transition-colors">
                                    {repo.name}
                                </h3>
                                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                            </div>

                            <p className="text-gray-800 dark:text-gray-300 text-sm mb-6 flex-grow line-clamp-3">
                                {repo.description || "No description available."}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mt-auto">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4" />
                                    <span>{repo.stargazers_count}</span>
                                </div>
                                {repo.language && (
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        <span>{repo.language}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
