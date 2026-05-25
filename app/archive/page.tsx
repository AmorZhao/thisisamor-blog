import type { Metadata } from "next";
import ClientThemeLayout from "@/layouts/ClientThemeLayout";
import ArchiveList from "./ArchiveList";

export const metadata: Metadata = { title: "Archive" };

export default function Archive() {
  return (
    <ClientThemeLayout currentPage="archive">
      <ArchiveList />
    </ClientThemeLayout>
  );
}
