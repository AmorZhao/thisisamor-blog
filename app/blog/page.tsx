"use client";
import Header from "@/components/Header";
import BlogPreview from "@/components/BlogPreview";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

const postsDirectoryTitle = "Slightly Tech"; 
const diariesDirectoryTitle = "Diary...";

const postsDirectory = "source/posts";
const diariesDirectory = "diaries";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

export default function BlogPage() {
  const [postTypePath, setPostTypePath] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('postTypePath') || postsDirectory;
    }
    return postsDirectory;
  });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPosts = async () => 
    {
      setLoading(true); 
      // console.log("fetching posts", `/api/GetAllPosts?directory=${postTypePath}`);
      const response = await fetch(`/api/GetAllPosts?directory=${postTypePath}`, { method: 'GET' });
      const rawData = await response.json();
      const formattedPosts = rawData.map((post: BlogPost) => ({
        slug: post.slug || "",
        title: post.title || "Untitled",
        description: post.description || "No description available",
        date: post.date || "Unknown Date",
        category: post.category || "Uncategorized",
        tags: post.tags || [],
      }));
      setPosts(formattedPosts);
      setLoading(false); 
    };
    
    fetchPosts();
  }, [postTypePath]);

  const handlePostTypeChange = (newPostType: string) => {
    if (newPostType === postsDirectoryTitle) {
      setPostTypePath(postsDirectory);
      localStorage.setItem('postTypePath', postsDirectory);
    } 
    else if (newPostType === diariesDirectoryTitle) {
      setPostTypePath(diariesDirectory);
      localStorage.setItem('postTypePath', diariesDirectory);
    }
  };

  const currentTitle = postTypePath === postsDirectory ? postsDirectoryTitle : diariesDirectoryTitle;

  return (
    <div>
      <Header currentPage="blog" />
      <div className="flex flex-1">
        <main className="w-full p-8 font-noto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-noto-semibold">Blog</h1>
            <Select onValueChange={handlePostTypeChange} value={currentTitle}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder={currentTitle} />
              </SelectTrigger>
              <SelectContent className="font-noto">
                {[postsDirectoryTitle, diariesDirectoryTitle].map((choice) => (
                  <SelectItem key={choice} value={choice}>
                    {choice}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            posts.length > 0 ? posts.map((post) => {
              return (
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
              );
            }) : (
              <p>No posts found.</p>
            )
          )}
        </main>
      </div>
    </div>
  );
}
