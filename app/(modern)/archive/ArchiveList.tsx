"use client";
import { useGroupedArchivePosts } from "@/lib/hooks/useArchivePosts";

export default function ArchiveList() {
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
                <p className="text-lg text-grey-500 dark:text-grey-350 y2k:text-y2k-light-grey dark:y2k:text-y2k-dark-grey ml-6 col-span-1 mt-4">{month}</p>
                <div className="col-span-4 space-y-4">
                  {groupedPosts[year][month].map((post) => (
                    <div key={post.slug} className="p-4 border border-grey-200 dark:border-grey-700 rounded-lg shadow-sm">
                      <a href={`/blog/posts/${post.slug}`} className="text-lg hover:underline">
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
