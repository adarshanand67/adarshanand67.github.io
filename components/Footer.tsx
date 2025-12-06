import Link from "next/link";
import { getProfile } from "@/lib/api";

export default async function Footer() {
  const profile = await getProfile();

  return (
    <div className="section footer mt-12 bg-background pt-8 pb-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-3 font-bold text-gray-500">
              Writings and Learnings
            </div>
            <p className="mb-1">
              <Link
                href="/experience"
                className="text-foreground hover:underline"
              >
                Experience
              </Link>
            </p>
          </div>

          <div>
            <div className="mb-3 font-bold text-gray-500">Shelves</div>
            <p className="mb-1">
              <Link
                href="/bookshelf"
                className="text-foreground hover:underline"
              >
                Bookshelf
              </Link>
            </p>
            <p className="mb-1">
              <Link
                href="/papershelf"
                className="text-foreground hover:underline"
              >
                Papershelf
              </Link>
            </p>
            <p className="mb-1">
              <Link
                href="/animeshelf"
                className="text-foreground hover:underline"
              >
                Anime Shelf
              </Link>
            </p>
          </div>

          <div>
            <div className="mb-3 font-bold text-gray-500">
              Legal and Contact
            </div>
            <p className="mb-1">
              <Link href="/" className="text-foreground hover:underline">
                About me
              </Link>
            </p>
            <p className="mb-1">
              <a
                href={`mailto:${profile.socials.linkedin}`}
                className="text-foreground hover:underline"
              >
                Contact Me
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </div>
  );
}
