"use client";
import { useEffect, useState } from "react";

export interface DiaryData {
  title: string;
  content: string;
  published_at: string;
}

export interface PostData {
  title: string;
  date: string;
  category: string;
  description: string;
  tags: string[];
  content: string;
}

export function useBlogPostDetail(directory: string, slug: string) {
  const [diaryData, setDiaryData] = useState<DiaryData | null>(null);
  const [postData, setPostData] = useState<PostData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (directory === "diaries") {
        try {
          const url = `/api/GetPost?type=diary&slug=${slug}`;
          const response = await fetch(url, { method: "GET" });

          if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
          }

          const rawData = (await response.json()).rows[0];
          setDiaryData({
            title: rawData[1],
            content: rawData[3],
            published_at: rawData[4],
          });
        }
        catch (err) {
          console.error("Fetch error:", (err as Error).message);
          setError((err as Error).message);
        }
      }

      else if (directory === "posts") {
        try {
          const url = `/api/GetPost?type=post&slug=${slug}`;
          const response = await fetch(url, { method: "GET" });

          if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
          }

          const rawData = await response.json();
          setPostData({
            title: rawData.data.title,
            date: rawData.data.date,
            category: rawData.data.category,
            description: rawData.data.description,
            tags: rawData.data.tags,
            content: rawData.content,
          });
        }
        catch (err) {
          console.error("Fetch error:", (err as Error).message);
          setError((err as Error).message);
        }
      }
    };
    fetchData();
  }, [directory, slug]);

  return { diaryData, postData, error };
}
