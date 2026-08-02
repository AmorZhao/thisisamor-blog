import type { Metadata } from "next";
import Y2KArchiveList from "./ArchiveList";

export const metadata: Metadata = { title: "Archive" };

export default function Y2KArchive() {
  return <Y2KArchiveList />;
}
