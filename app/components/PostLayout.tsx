import React from "react";

interface Metadata {
  title: string;
  date: string;
  category: string;
}

export default function PostLayout({ metadata, children }: { metadata: Metadata; children: React.ReactNode }) {
  return (
    <article className="prose mx-auto">
      <h1 className="text-3xl font-bold">{metadata.title}</h1>
      <p className="text-gray-500">{metadata.date}</p>
      <p className="text-sm text-gray-700">Category: {metadata.category}</p>
      <div>{children}</div>
    </article>
  );
}
