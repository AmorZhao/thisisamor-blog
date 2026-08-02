"use client";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import { use } from "react";
import { useBlogPostDetail } from "@/lib/hooks/useBlogPostDetail";

type Params = { directory: string; slug: string };

const y2kMeta = "text-y2k-light-grey dark:text-y2k-dark-grey";

export default function Y2KBlogPost({ params }: { params: Promise<Params> }) {
  const { directory, slug } = use(params);
  const { diaryData, postData, error } = useBlogPostDetail(directory, slug);

  if (error) return <p>Failed to load diary: {error}</p>;

  if (directory === "diaries") {
    return (
      <main className="w-full p-8">
        <article className="prose mx-auto">
          <div className="markdown-body">
            {diaryData ? (
              <div>
                <div className={`flex items-center space-x-8 mt-2 mb-2 ml-2 text-sm ${y2kMeta}`}>
                  <p><i className="fa-solid fa-calendar mr-2"></i>{new Date(diaryData.published_at).toLocaleString("en-GB", { dateStyle: "short" })}</p>
                </div>
                <Markdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex, rehypeStringify]}
                >
                  {diaryData.content}
                </Markdown>
              </div>
            ) : <p>Loading content...</p>}
          </div>
        </article>
      </main>
    );
  }

  if (directory === "posts") {
    return (
      <main className="w-full p-8">
        <article className="prose mx-auto">
          {postData ? (
            <div>
              <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
              <div className="markdown-body">
                <hr />
                <div className={`flex items-center space-x-8 mt-2 mb-2 text-sm ${y2kMeta}`}>
                  <p>
                    <i className="fa-solid fa-calendar ml-1"></i>{" "}
                    {new Date(postData.date).toLocaleString("en-GB", {
                      dateStyle: "short",
                      timeStyle: "medium",
                    })}
                  </p>
                  <p>
                    <i className="fa-solid fa-folder-closed"></i> {postData.category}
                  </p>
                </div>
                <p className={`${y2kMeta} ml-1`}>Description: {postData.description}</p>
                <hr />
                <br />
                <Markdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex, rehypeStringify]}
                >
                  {postData.content}
                </Markdown>
              </div>
            </div>
          ) : <p>Loading content...</p>}
        </article>
      </main>
    );
  }

  return notFound();
}
