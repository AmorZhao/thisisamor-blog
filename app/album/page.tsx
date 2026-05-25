import type { Metadata } from "next";
import ClientThemeLayout from '@/layouts/ClientThemeLayout';

export const metadata: Metadata = { title: "Album" };

export default function Album() {
  return (
    <ClientThemeLayout currentPage="album">
      <main className="p-8 font-noto">
        {/* TODO: Album content */}
      </main>
    </ClientThemeLayout>
  );
}
