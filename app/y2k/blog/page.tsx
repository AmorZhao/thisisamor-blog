import type { Metadata } from "next";
import Y2KBlogList from "./BlogList";

export const metadata: Metadata = { title: "Blog" };

export default function Y2KBlogPage() {
  return <Y2KBlogList />;
}
