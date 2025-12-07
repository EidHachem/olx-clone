"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import PostHeader from "./PostHeader";

export default function HeaderSwitcher() {
  const pathname = usePathname();

  // use specific header on post-ad page
  if (pathname === "/post-ad") {
    return <PostHeader />;
  }

  // default header for all other pages
  return <Header />;
}
