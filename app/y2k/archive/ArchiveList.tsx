"use client";
import { useGroupedArchivePosts } from "@/lib/hooks/useArchivePosts";

const panel = [
  "bg-win95-face",
  "border-t-2 border-l-2 border-b-2 border-r-2",
  "border-t-win95-shadow-dark border-l-win95-shadow-dark border-b-white border-r-white",
  "shadow-[inset_1px_1px_0_var(--color-win95-shadow),inset_-1px_-1px_0_var(--color-win95-highlight)]",
  "dark:bg-y2k-dark-panel dark:border-t-black dark:border-l-black dark:border-b-y2k-dark-cyan dark:border-r-y2k-dark-cyan",
  "dark:shadow-none",
].join(" ");

export default function Y2KArchiveList() {
  const groupedPosts = useGroupedArchivePosts();

  return (
    <main className="w-full p-8">
      <h1 className="text-2xl mb-4">Archive</h1>
      <div className="space-y-4">
        {Object.keys(groupedPosts).map((year) => (
          <div key={year}>
            <h2 className="text-xl p-2 ml-2 mt-6">{year}</h2>
            {Object.keys(groupedPosts[year]).map((month) => (
              <div key={`${year}-${month}`} className="grid grid-cols-5 items-start mb-4">
                <p className="text-lg text-y2k-light-grey dark:text-y2k-dark-grey ml-6 col-span-1 mt-4">{month}</p>
                <div className="col-span-4 space-y-4">
                  {groupedPosts[year][month].map((post) => (
                    <div key={post.slug} className={`p-4 ${panel}`}>
                      <a href={`/y2k/blog/posts/${post.slug}`} className="text-lg hover:underline">
                        {post.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
