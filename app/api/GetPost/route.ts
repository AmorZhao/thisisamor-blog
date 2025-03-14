import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function GET(request: NextRequest) 
{
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug") as string;
    const type = url.searchParams.get("type") as string;

    if (!slug) {
        return NextResponse.json({ message: "post slug is required" }, { status: 400 });
    }

    if(type === "diary")
    {
        try 
        {
            const turso_client = createClient({
                url: process.env.TURSO_DATABASE_URL as string,
                authToken: process.env.TURSO_AUTH_TOKEN as string
            });

            const diaryContent = await turso_client.execute({
                sql: "SELECT * FROM posts WHERE slug = ?",
                args: [slug],
            }); 

            return NextResponse.json(diaryContent);
        }
        catch (error) 
        {
            console.error("Error fetching posts:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    }
    
    if(type === "post")
    {
        const sourceDirectory = path.join(process.cwd(), "source/posts/");
        const filePath = path.join(sourceDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(filePath, "utf-8");
        const { content, data } = matter(fileContents);
        return NextResponse.json({ content, data });
    }

    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
}
