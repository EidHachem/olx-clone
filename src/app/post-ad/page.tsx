"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import PostAdCategoryStep from "@/components/post-ad/PostAdCategoryStep";
import type { PostAdCategoryId } from "@/lib/postAdCategories";
import PostAdDynamicCategoryStep from "@/components/post-ad/PostAdDynamicCategoryStep";

type Category = {
  id: number;
  name: string;
  name_l1: string;
  slug: string;
  level: number;
  parentID: number | null;
  children: Category[];
};

export default function PostAdPage() {
  const t = useTranslation();
  const [selectedCategory, setSelectedCategory] =
    useState<PostAdCategoryId | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories", err);
      }
    }

    loadCategories();
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

        {selectedCategory === null ? (
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
