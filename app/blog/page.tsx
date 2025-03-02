import Header from "../components/Header";
import BlogPreview from "../components/BlogPreview";

export default function BlogPage() {
  return (
    <div>
      <Header currentPage="Blog"/>
      <div className="flex flex-1">
        <main className="w-4/5 p-8 font-noto">
          <h1 className="text-2xl font-noto-semibold mb-4">Blog</h1>
          <BlogPreview 
            title="First Blog Post" 
            content="This is the content of the first blog post." 
          />
        </main>
      </div>
    </div>
  );
}
