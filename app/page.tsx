import ClientThemeLayout from "@/layouts/ClientThemeLayout";

export default function Home() {
  return (
    <ClientThemeLayout currentPage="home">
      <main className="p-8 font-noto">
        <h1 className="text-2xl font-noto-semibold mb-4">Welcome to the Home Page</h1>
        <div className="mt-4 mb-4">
          <p className="mb-2">This is the home page content.</p>
          <p className="mb-2">没事哒没事哒，先做个垃圾出来~</p>
        </div>
        <div className="mt-12 mb-8">
          <h2 className="text-xl font-noto mb-2">Known bugs :[</h2>
          <ul>
            <li className="mb-2">Favicon won&apos;t load when a blog post is open.</li>
            <li className="mb-2">Tables displayed as blocks in blog posts (to allow horizontal scrolling on smaller screens) are no longer centered.</li>
            <li className="mb-2">Styling is inconsistent for some pages.</li>
            <li className="mb-2">The markdown code blocks has a small offset at its first row.</li>
            <li className="mb-2">It might just be me, but bold text doesn&apos;t appear very bold in dark mode.</li>
          </ul>
        </div>
        <div className="mt-4 mb-4">
          <h2 className="text-xl font-noto mb-2">Undocumented Features :]</h2>
          <ul>
            <li className="mb-2">The archive page only shows tech posts to prevent diaries from flooding the list.</li>
            <li className="mb-2">Tags on the blog preview look clickable, but they don&apos;t do anything because I haven&apos;t added the feature.</li>
          </ul>
        </div>
      </main>
    </ClientThemeLayout>
  );
}
