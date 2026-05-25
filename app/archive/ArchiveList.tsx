"use client";
import { useEffect, useState } from "react";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

export default function ArchiveList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/GetAllPosts?directory=source/posts`, { method: 'GET' });
      const rawData = await response.json();
      setPosts(rawData.map((post: BlogPost) => ({
        slug: post.slug || "",
        title: post.title || "Untitled",
        date: post.date || "Unknown Date",
      })));
    };
    fetchPosts();
  }, []);

  const groupedPosts: { [year: string]: { [month: string]: BlogPost[] } } = {};
  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString();
    const month = new Date(post.date).toLocaleString("en-UK", { month: "short" });
    if (!groupedPosts[year]) groupedPosts[year] = {};
    if (!groupedPosts[year][month]) groupedPosts[year][month] = [];
    groupedPosts[year][month].push(post);
  });

  return (
    <main className="w-full p-8 font-noto">
      <h1 className="text-2xl font-noto-semibold mb-4">Archive</h1>
      <div className="space-y-4">
        {Object.keys(groupedPosts).map((year) => (
          <div key={year}>
            <h2 className="text-xl p-2 ml-2 mt-6">{year}</h2>
            {Object.keys(groupedPosts[year]).map((month) => (
              <div key={`${year}-${month}`} className="grid grid-cols-5 items-start mb-4">
                <p className="text-lg custom-gray ml-6 col-span-1 mt-4">{month}</p>
                <div className="col-span-4 space-y-4">
                  {groupedPosts[year][month].map((post) => (
                    <div key={post.slug} className="p-4 custom-border rounded-lg shadow-sm">
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
