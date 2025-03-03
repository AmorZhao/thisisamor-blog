import Header from "../components/Header";
import { getAllPosts } from "../../lib/md";
import BlogPreview from "../components/BlogPreview";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <Header currentPage="blog"/>
      <div className="flex flex-1">
        <main className="w-full p-8 font-noto">
           <h1 className="text-2xl font-noto-semibold mb-4">Blog</h1>
            {posts.map((post) => (
              <BlogPreview 
                key={post.slug} 
                title={post.title} 
                description={post.description} 
                date={post.date}
                category={post.category}
                tags={post.tags}
                link={post.slug}
              />
            ))}
         </main>
       </div>
    </div>
  );
}

