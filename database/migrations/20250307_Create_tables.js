import { createClient } from "@libsql/client";
import * as dotenv from 'dotenv'
import { resolve } from 'path';

const envPath = resolve(process.cwd(), "../../.env");

const config_result = dotenv.config({ path: envPath });
if (config_result.error) 
{
    throw config_result.error;
}

let turso_client; 
const using_local_db = process.env.USING_LOCAL_DB;

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

async function executeQuery() {
  try {
    const result = await turso_client.execute({
      sql: "SELECT name FROM sqlite_master WHERE type='table';",
      args: [],
    });
    console.log(result);
  } catch (error) {
    console.error("Query error:", error);
  }
}

async function createTables() 
{
  await turso_client.execute({
    sql: `CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      published_at DATE 
    );`,
    args: [],
  });

  await turso_client.execute({
    sql: `CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      post_id INTEGER NOT NULL,
      url TEXT NOT NULL,
      alt TEXT,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );`,
    args: [],
  });

  await turso_client.execute({
    sql: `CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT UNIQUE NOT NULL
    );`,
    args: [],
  });

  await turso_client.execute({
    sql: `CREATE TABLE IF NOT EXISTS post_tags (
      post_id INTEGER NOT NULL,
      tag_id INTEGER NOT NULL,
      PRIMARY KEY (post_id, tag_id),
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );`,
    args: [],
  });
}

await createTables(); 
await executeQuery();
