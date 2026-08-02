"use client";
import BlogPreview from "@/components/modern/BlogPreview";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBlogPosts } from "@/lib/hooks/useBlogPosts";
import { useState } from "react";

const postsDirectoryTitle = "Slightly Tech";
const diariesDirectoryTitle = "Diary...";
const postsDirectory = "source/posts";
const diariesDirectory = "diaries";

export default function BlogList() {
  const [postTypePath, setPostTypePath] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('postTypePath') || postsDirectory;
    }
    return postsDirectory;
  });
  const { posts, loading } = useBlogPosts(postTypePath);

  const handlePostTypeChange = (newPostType: string) => {
    if (newPostType === postsDirectoryTitle) {
      setPostTypePath(postsDirectory);
      localStorage.setItem('postTypePath', postsDirectory);
    } else if (newPostType === diariesDirectoryTitle) {
      setPostTypePath(diariesDirectory);
      localStorage.setItem('postTypePath', diariesDirectory);
    }
  };

  const currentTitle = postTypePath === postsDirectory ? postsDirectoryTitle : diariesDirectoryTitle;

  return (
    <main className="w-full p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl">Blog</h1>
        <Select onValueChange={handlePostTypeChange} value={currentTitle}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={currentTitle} />
          </SelectTrigger>
          <SelectContent>
            {[postsDirectoryTitle, diariesDirectoryTitle].map((choice) => (
              <SelectItem key={choice} value={choice}>{choice}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.length > 0 ? posts.map((post) => (
          <BlogPreview
            key={post.slug}
            title={post.title}
            description={post.description}
            date={post.date}
            category={post.category}
            tags={post.tags}
            postType={postTypePath.substring(postTypePath.lastIndexOf('/') + 1)}
            link={post.slug}
          />
        )) : <p>No posts found.</p>
      )}
    </main>
  );
}
