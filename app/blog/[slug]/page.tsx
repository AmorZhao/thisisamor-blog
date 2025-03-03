import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), "source/posts");

type Params = { slug: string };

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.promises.readFile(filePath, "utf-8");

    const { content, data } = matter(fileContents);

    return (
      <div>
        <Header currentPage="blog" />
        <div className="flex flex-1">
          <main className="w-full p-8 font-noto">
            <article className="prose mx-auto">
              <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
              <div className="markdown-body">
                <hr />
                <div className="flex items-center space-x-8 mt-2 mb-2 text-sm custom-gray">
                    <p><i className="fa-solid fa-calendar ml-1"></i> {new Date(data.date).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "medium" })}</p>
                    <p><i className="fa-solid fa-folder-closed"></i> {data.category}</p>
                </div>
                <p className="custom-gray ml-1" >Description: {data.description}</p>
                <hr />
                <br />
                <div >
                    <Markdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex, rehypeStringify]}
                    >
                        {content}
                    </Markdown>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    );
  } 
  catch {
    console.error(`Failed to load post: ${slug}`);
    return notFound();
  }
}
