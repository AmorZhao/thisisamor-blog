import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/md";
import { createClient } from "@libsql/client";

interface DatabasePost {
  slug: string;
  title: string;
  published_at: string;
}

export async function GET(request: NextRequest) 
{
  const url = new URL(request.url);
  const directory = url.searchParams.get("directory") as string;

  if (!directory) {
    return NextResponse.json({ message: "Directory is required" }, { status: 400 });
  }

  if (directory === "source/posts") 
  {
    try 
    {
      const posts = await getAllPosts(directory);
      return NextResponse.json(posts);
    } 
    catch (error) {
      console.error("Error fetching posts:", error);
      return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
    }
  }

  else if (directory === "diaries") 
  {    
    try 
    {
      const turso_client = createClient({
        url: process.env.TURSO_DATABASE_URL as string,
        authToken: process.env.TURSO_AUTH_TOKEN as string
      });
      const diaryFromDatabase = await turso_client.execute({
        sql: "SELECT id, title, slug, published_at FROM posts ORDER BY published_at DESC",
        args: [],
      }); 

      const formattedDiaryFromDatabase = (diaryFromDatabase.rows as unknown as DatabasePost[]).map(
        (post: DatabasePost) => ({
          slug: post.slug,
          title: post.title,
          description: "No description available",
          date: post.published_at,
          category: "Uncategorized",
          tags: [],
      }));
      
      const sortedDiaries = formattedDiaryFromDatabase.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return NextResponse.json(sortedDiaries);
    }
    catch (error) {
      console.error("Error fetching posts:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Invalid directory" }, { status: 400 });
}
