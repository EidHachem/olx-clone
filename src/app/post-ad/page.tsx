"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import PostAdCategoryStep from "@/components/post-ad/PostAdCategoryStep";
import PostAdDynamicCategoryStep from "@/components/post-ad/PostAdDynamicCategoryStep";
import type { PostAdCategoryId } from "@/lib/postAdCategories";

type OlxCategory = {
  id: number;
  name: string;
  name_l1: string;
  slug: string;
  level: number;
  parentID: number | null;
  children: OlxCategory[];
};

export default function PostAdPage() {
  const t = useTranslation();
  const [selectedCategory, setSelectedCategory] =
    useState<PostAdCategoryId | null>(null);

  const [categories, setCategories] = useState<OlxCategory[] | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data: OlxCategory[] = await res.json();
        setCategories(data);
      } catch (e) {
        console.error("Failed to fetch categories", e);
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl bg-white rounded-lg border border-gray-200 px-6 py-8">
        <h1 className="text-2xl font-semibold text-[#002f34]">
          {t("postAd.title")}
        </h1>

        <h2 className="mt-4 text-sm font-semibold text-[#002f34]">
          {t("postAd.chooseCategory")}
        </h2>

        {selectedCategory === null || !categories ? (
          <div className="mt-6">
            <PostAdCategoryStep onSelectCategory={setSelectedCategory} />
          </div>
        ) : (
          <PostAdDynamicCategoryStep
            initialCategoryKey={selectedCategory}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
}
