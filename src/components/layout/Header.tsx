"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 flex items-center justify-between">
        
        <Link href="/" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 106 56"
            className="h-8 w-auto"
            aria-label="OLX Logo"
          >
            <path
              d="M25.12 0A25.1 25.1 0 0 0 0 25.08c0 13.84 11.28 25.08 25.15 25.08s25.12-11.21 25.12-25.08A25.12 25.12 0 0 0 25.12 0m.03 32.68a7.58 7.58 0 0 1-7.62-7.6c0-4.22 3.4-7.6 7.62-7.6a7.58 7.58 0 0 1 7.61 7.6 7.58 7.58 0 0 1-7.61 7.6m42.4-25.81A7.23 7.23 0 0 0 60.32 0a7.21 7.21 0 0 0-7.21 6.8h-.02v36.13a7.23 7.23 0 0 0 14.47 0l-.01-.34h.01V6.87h-.02zm36.6 31.2l-5.81-5.81 4.79-4.78a7.2 7.2 0 0 0 2.87-5.75 7.23 7.23 0 0 0-7.24-7.23 7.22 7.22 0 0 0-5.63 2.7l-4.94 4.93-4.84-4.83a7.22 7.22 0 0 0-5.8-2.93c-4 0-7.25 3.24-7.25 7.23a7.2 7.2 0 0 0 2.64 5.57l5.1 5.09-4.6 4.6a7.21 7.21 0 0 0-3.14 5.94 7.23 7.23 0 0 0 7.24 7.23 7.2 7.2 0 0 0 4.86-1.89h.03l5.76-5.74 4.55 4.54a7.24 7.24 0 0 0 6.02 3.22c4 0 7.24-3.24 7.24-7.23a7.2 7.2 0 0 0-1.85-4.81v-.05z"
              fill="#002f34"
            />
          </svg>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
  <Link
    href="/"
    className="px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-50 transition"
  >
    Home
  </Link>

  <Link
    href="/post-ad"
    className="px-4 py-2 rounded-full bg-[#ffd500] text-[#002f34] font-semibold hover:bg-[#ffe566] transition"
  >
    Post an ad
  </Link>
</nav>
      </div>
    </header>
  );
}
