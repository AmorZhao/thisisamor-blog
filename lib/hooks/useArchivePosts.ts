"use client";
import { useEffect, useState } from "react";

interface ArchivePost {
  slug: string;
  title: string;
  date: string;
}

export function useGroupedArchivePosts() {
  const [posts, setPosts] = useState<ArchivePost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/GetAllPosts?directory=source/posts`, { method: "GET" });
      const rawData = await response.json();
      setPosts(rawData.map((post: ArchivePost) => ({
        slug: post.slug || "",
        title: post.title || "Untitled",
        date: post.date || "Unknown Date",
      })));
    };
    fetchPosts();
  }, []);

  const groupedPosts: { [year: string]: { [month: string]: ArchivePost[] } } = {};

  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString();
    const month = new Date(post.date).toLocaleString("en-UK", { month: "short" });

    if (!groupedPosts[year]) {
      groupedPosts[year] = {};
    }
    if (!groupedPosts[year][month]) {
      groupedPosts[year][month] = [];
    }
    groupedPosts[year][month].push(post);
  });

  return groupedPosts;
}
