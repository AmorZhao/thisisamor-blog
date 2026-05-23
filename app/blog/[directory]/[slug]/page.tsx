"use client"; 
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import { useEffect, useState } from "react";
import { use } from "react";

type Params = { directory: string; slug: string };

export default function BlogPost({ params }: { params: Promise<Params> }) 
{
  const { directory, slug } = use(params);

  interface DiaryData {
    title: string;
    content: string;
    published_at: string;
  }

  interface PostData {
    title: string;
    date: string;
    category: string;
    description: string;
    tags: string[];
    content: string;
  }

  const [diaryData, setDiaryData] = useState<DiaryData | null>(null);
  const [postData, setPostData] = useState<PostData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (directory === "diaries") 
      {    
        try 
        {
          const url: string = `/api/GetPost?type=diary&slug=${slug}`;
          const response = await fetch(url, { method: "GET" });

          if (!response.ok) 
          {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
          }
          const rawData = (await response.json()).rows[0];
          const formattedData = {
            title: rawData[1],
            content: rawData[3],
            published_at: rawData[4],
          };
          setDiaryData(formattedData);
        } 
        catch (error) 
        {
          console.error("Fetch error:", (error as Error).message);
          setError((error as Error).message);
        }
      }
      else if (directory === "posts")
      {
        try 
        {
          const url: string = `/api/GetPost?type=post&slug=${slug}`;
          const response = await fetch(url, { method: "GET" });

          if (!response.ok) 
          {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
          }
          const rawData = (await response.json());
          const formattedData = {
            title: rawData.data.title, 
            date: rawData.data.date, 
            category: rawData.data.category,
            description: rawData.data.description,
            tags: rawData.data.tags, 
            content: rawData.content
          }; 
          setPostData(formattedData);
        } 
        catch (error) 
        {
          console.error("Fetch error:", (error as Error).message);
          setError((error as Error).message);
        }
      }
    };
    fetchData();
  }, [directory, slug]);

  if (error) return <p>Failed to load diary: {error}</p>;

  if (directory === "diaries") 
  {
    return (
      <div>
      <Header currentPage="blog" />
      <div className="flex flex-1">
        <main className="w-full p-8 font-noto">
          <article className="prose mx-auto">
            <div className="markdown-body">
            {diaryData ? (
              <div>
                <div className="flex items-center space-x-8 mt-2 mb-2 ml-2 text-sm custom-gray">
                  <p><i className="fa-solid fa-calendar mr-2"></i>{new Date(diaryData.published_at).toLocaleString("en-GB", { dateStyle: "short"})}</p>
                </div>
                <div>
                  <Markdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex, rehypeStringify]}
                  >
                    {diaryData.content}
                  </Markdown>
                </div>
              </div>
            ) : <p>Loading content...</p> }
            </div>
          </article>
        </main>
      </div>
    </div>
    );
  }

  if (directory === "posts") 
  {
    return (
      <div>
        <Header currentPage="blog" />
        <div className="flex flex-1">
          <main className="w-full p-8 font-noto">
            <article className="prose mx-auto">
            {postData ? (
              <div>
                <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
                <div className="markdown-body">
                  <hr />
                  <div className="flex items-center space-x-8 mt-2 mb-2 text-sm custom-gray">
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
                  <p className="custom-gray ml-1">Description: {postData.description}</p>
                  <hr />
                  <br />
                  <div>
                    <Markdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex, rehypeStringify]}
                    >
                      {postData.content}
                    </Markdown>
                  </div>
                </div>
              </div>
            ) : <p>Loading content...</p> }
            </article>
          </main>
        </div>
      </div>
    );
  }

  return notFound();
}
