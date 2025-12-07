"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 flex flex-col gap-3">
        <div>
          <Link href="/" aria-label="OLX Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 106 56"
              className="h-7 w-auto"
            >
              <path
                d="M25.12 0A25.1 25.1 0 0 0 0 25.08c0 13.84 11.28 25.08 25.15 25.08s25.12-11.21 25.12-25.08A25.12 25.12 0 0 0 25.12 0m.03 32.68a7.58 7.58 0 0 1-7.62-7.6c0-4.22 3.4-7.6 7.62-7.6a7.58 7.58 0 0 1 7.61 7.6 7.58 7.58 0 0 1-7.61 7.6m42.4-25.81A7.23 7.23 0 0 0 60.32 0a7.21 7.21 0 0 0-7.21 6.8h-.02v36.13a7.23 7.23 0 0 0 14.47 0l-.01-.34h.01V6.87h-.02zm36.6 31.2l-5.81-5.81 4.79-4.78a7.2 7.2 0 0 0 2.87-5.75 7.23 7.23 0 0 0-7.24-7.23 7.22 7.22 0 0 0-5.63 2.7l-4.94 4.93-4.84-4.83a7.22 7.22 0 0 0-5.8-2.93c-4 0-7.25 3.24-7.25 7.23a7.2 7.2 0 0 0 2.64 5.57l5.1 5.09-4.6 4.6a7.21 7.21 0 0 0-3.14 5.94 7.23 7.23 0 0 0 7.24 7.23 7.2 7.2 0 0 0 4.86-1.89h.03l5.76-5.74 4.55 4.54a7.24 7.24 0 0 0 6.02 3.22c4 0 7.24-3.24 7.24-7.23a7.2 7.2 0 0 0-1.85-4.81v-.05z"
                fill="#000000"
              />
            </svg>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 min-w-[150px] text-sm text-[#002f34] bg-white">
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#ffce32]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21s7-7.166 7-11.5A7 7 0 0 0 5 9.5C5 13.834 12 21 12 21Z"
                  stroke="#ffce32"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="9.5"
                  r="2.3"
                  stroke="#ffce32"
                  strokeWidth="1.7"
                />
              </svg>
              <span>Lebanon</span>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex-1 flex items-stretch border border-gray-300 rounded-md overflow-hidden bg-white h-10">
            <input
              className="flex-1 px-3 text-sm outline-none h-full"
              placeholder="Find Cars, Mobile Phones and more..."
            />
            <button className="flex items-center justify-center px-4 bg-[#23a6f0] h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="5"
                  stroke="white"
                  strokeWidth="1.7"
                />
                <path
                  d="M16 16l3 3"
                  stroke="white"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm ml-2">
            <button className="text-[#002f34] hover:underline">
              العربية
            </button>

            <button aria-label="Messages">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#002f34]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 5h16v10H7l-3 3V5Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button aria-label="Notifications">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#002f34]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 4a4 4 0 0 0-4 4v3.5L7 14v1h10v-1l-1-2.5V8a4 4 0 0 0-4-4Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 18a2 2 0 0 0 4 0"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="h-8 w-8 rounded-full bg-[#ffce32] flex items-center justify-center text-xs font-semibold text-[#002f34]">
              ME
            </div>

            <Link
              href="/post-ad"
              className="px-4 py-2 rounded-full bg-[#ffd500] text-[#002f34] font-semibold hover:bg-[#ffe566] whitespace-nowrap"
            >
              Post an ad
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
