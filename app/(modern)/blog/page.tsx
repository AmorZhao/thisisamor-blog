import type { Metadata } from "next";
import BlogList from "./BlogList";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return <BlogList />;
}
