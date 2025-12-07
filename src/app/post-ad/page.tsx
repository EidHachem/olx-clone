"use client";

import { useTranslation } from "@/hooks/useTranslation";

export default function PostAdPage() {
  const t = useTranslation();

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl bg-white rounded-lg border border-gray-200 px-6 py-8">
        <h1 className="text-2xl font-semibold text-[#002f34]">
          {t("postAd.title")}
        </h1>

        <h2 className="mt-4 text-sm font-semibold text-[#002f34]">
          {t("postAd.chooseCategory")}
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          {t("postAd.hint")}
        </p>
      </div>
    </div>
  );
}
