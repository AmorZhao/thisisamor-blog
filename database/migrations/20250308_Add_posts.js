import { createClient } from "@libsql/client";
import * as dotenv from 'dotenv'
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import slugify from 'slugify';
import pinyinPkg from 'pinyin';
const { pinyin } = pinyinPkg;

const envPath = resolve(process.cwd(), "../../.env");

const config_result = dotenv.config({ path: envPath });
if (config_result.error) 
{
    throw config_result.error;
}

let turso_client; 
const using_local_db = process.env.USING_LOCAL_DB;
console.log(`Using local db: ${using_local_db}`);

if (using_local_db === "true")
{
    turso_client = createClient({
        url: process.env.LOCAL_DATABASE_URL,
    });

    console.log("Connected to local database");
}
else 
{
    const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
    const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

    if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) 
    {
        console.error("Error reading environment variables");
        process.exit(1);
    }

    turso_client = createClient({
        url: TURSO_DATABASE_URL,
        authToken: TURSO_AUTH_TOKEN,
    });

    console.log("Connected to Turso successfully");
}

// ====================================

async function executeQuery() 
{
    try 
    {
        const result = await turso_client.execute({
            sql: "SELECT id, title, slug, published_at FROM posts ORDER BY published_at DESC;",
            args: [],
        });
        console.log(result.rows);
    } 
    catch (error) 
    {
        console.error("Query error:", error);
    }
}

async function dropAllPosts() 
{
    try 
    {
        await turso_client.execute({
            sql: "DELETE FROM posts;",
            args: [],
        });
        console.log("All posts deleted");
    } 
    catch (error) 
    {
        console.error("Error deleting posts:", error);
    }
}

const textDirectory = path.resolve(process.cwd(), "../old-blogs/text/");
const csvFilePath = path.resolve(process.cwd(), "../old-blogs/information.csv");

async function readFilesAndInsert() 
{
    const files = fs.readdirSync(textDirectory).filter(file => file.endsWith('.md'));
    const csvData = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv({ headers: ['title', 'published_at'] })) 
        .on('data', (row) => {
            csvData.push(row);
        })
        .on('end', async () => {
            console.log(csvData); 
            for (const file of files) 
            {
                const title = path.basename(file, '.md');
                const content = fs.readFileSync(path.join(textDirectory, file), 'utf-8');
                const csvRecord = csvData.find(row => row.title === `${title}`);

                if (csvRecord) 
                {
                    const pinyinTitle = pinyin(title, { style: pinyin.STYLE_NORMAL })
                        .join('')
                        .replace(/[^\w\s]/gi, '-');
                    const slug = slugify(pinyinTitle, { lower: true });
                    const publishedAt = csvRecord.published_at;

                    console.log(`Try inserting post: ${title}, published at: ${publishedAt}, slug: ${slug}`);

                    try 
                    {
                        await turso_client.execute({
                            sql: `INSERT OR REPLACE INTO posts (title, content, published_at, slug) VALUES (?, ?, ?, ?)`,
                            args: [title, content, publishedAt, slug],
                        });
                        console.log(`Inserted post: ${title}, published at: ${publishedAt}, slug: ${slug}`);
                    } 
                    catch (error) {
                        console.error(`Error inserting post ${title}:`, error);
                    }
                } 
                else 
                {
                    console.warn(`No publish date found for file: ${title}`);
                }
            }
        });
}

// await dropAllPosts();

await readFilesAndInsert();

// await executeQuery();
