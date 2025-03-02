import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      <Header currentPage="home"/>
      <div className="flex flex-1">
        <main className="p-8 font-noto">
          <h1 className="text-2xl font-noto-semibold mb-4">Welcome to the Home Page</h1>
          <p>This is the home page content.</p>
          <p>没事哒没事哒，先做个垃圾出来~</p>
        </main>
      </div>
    </div>
  );
}
