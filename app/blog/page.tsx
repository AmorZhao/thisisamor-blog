import type { Metadata } from "next";
import ClientThemeLayout from "@/layouts/ClientThemeLayout";
import BlogList from "./BlogList";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <ClientThemeLayout currentPage="blog">
      <BlogList />
    </ClientThemeLayout>
  );
}
