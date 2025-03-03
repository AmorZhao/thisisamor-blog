import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "source/posts");

export function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter((file) => file.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
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
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
