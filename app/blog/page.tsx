import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Blog from "../components/Blog";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Blog</h1>
          <Blog title="First Blog Post" content="This is the content of the first blog post." />
          <Blog title="Second Blog Post" content="This is the content of the second blog post." />
        </main>
      </div>
    </div>
  );
}