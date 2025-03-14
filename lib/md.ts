'use server'
import { promises as fs } from 'fs';
import path from "path";
import matter from "gray-matter";

export async function getAllPosts(
  directory: string
) {
  const filenames = await fs.readdir(directory);

  const posts = await Promise.all(
    filenames
      .filter((file) => file.endsWith(".md"))
      .map(async (filename) => {
        const filePath = path.join(directory, filename);
        const fileContents = await fs.readFile(filePath, "utf-8");
        const { data } = matter(fileContents);
        const slug = filename.replace(".md", "");

        return {
          slug,
          title: data.title || "Untitled",
          date: data.date ? new Date(data.date).toISOString() : "No Date",
          description: data.description || "",
          category: data.category || "Uncategorized",
          tags: data.tags || []
        };
      })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
