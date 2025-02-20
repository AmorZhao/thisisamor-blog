import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function About() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">About</h1>
          <p>Hi! This is Amor.</p>
        </main>
      </div>
    </div>
  );
}