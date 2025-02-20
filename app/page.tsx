import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
          <p>This is the home page content.</p>
          <p>中文测试 一二三四五六七八九</p>
        </main>
      </div>
    </div>
  );
}