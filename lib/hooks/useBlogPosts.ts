"use client";
import { useEffect, useState } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

export function useBlogPosts(directory: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const fetchPosts = async () => {
      const response = await fetch(`/api/GetAllPosts?directory=${directory}`, { method: "GET" });
      const rawData = await response.json();
      if (cancelled) {
        return;
      }
      setPosts(rawData.map((post: BlogPost) => ({
        slug: post.slug || "",
        title: post.title || "Untitled",
        description: post.description || "No description available",
        date: post.date || "Unknown Date",
        category: post.category || "Uncategorized",
        tags: post.tags || [],
      })));
      setLoading(false);
    };
    fetchPosts();
    return () => { cancelled = true; };
  }, [directory]);

  return { posts, loading };
}
