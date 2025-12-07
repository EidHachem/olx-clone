"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "../layout/LanguageProvider";
import type { PostAdCategoryId } from "@/lib/postAdCategories";

type Category = {
    id: number;
    name: string;
    name_l1: string;
    slug: string;
    level: number;
    parentID: number | null;
    children: Category[];
};

type Props = {
    initialCategoryKey: PostAdCategoryId;
    categories: Category[];
};

export default function PostAdDynamicCategoryStep({
    initialCategoryKey,
    categories,
}: Props) {
    const t = useTranslation();
    const { language } = useLanguage();
    const isArabic = language === "ar";

    const [selectedMainId, setSelectedMainId] = useState<number | null>(null);
    const [selectedSubId, setSelectedSubId] = useState<number | null>(null);

    const mainCategories = categories.filter(
        (c) => c.parentID === null || c.level === 0
    );

    // Helper for label
    const getLabel = (cat: Category) =>
        isArabic ? cat.name_l1 || cat.name : cat.name;

    useEffect(() => {
        if (!categories.length || !mainCategories.length) return;

        const match =
            mainCategories.find((c) => c.slug === initialCategoryKey) ??
            mainCategories[0];

        if (match && selectedMainId === null) {
            setSelectedMainId(match.id);
            setSelectedSubId(null);
        }
    }, [categories, mainCategories, initialCategoryKey, selectedMainId]);

    if (!categories.length || !mainCategories.length) {
        return (
            <div className="mt-6 grid grid-cols-3 md:grid-cols-[260px,_1fr,_1fr] border border-gray-200 rounded-lg overflow-hidden">
                <div className="border-r bg-[#f5f5f5]" />
                <div className="border-r bg-white" />
                <div className="bg-white" />
            </div>
        );
    }

    const selectedMain =
        categories.find((c) => c.id === selectedMainId) ?? mainCategories[0];

    const subcategories = selectedMain?.children ?? [];

    useEffect(() => {
        if (!subcategories.length) {
            setSelectedSubId(null);
            return;
        }

        const stillValid = subcategories.some((s) => s.id === selectedSubId);
        if (!stillValid) {
            setSelectedSubId(subcategories[0].id);
        }
    }, [selectedMainId, subcategories, selectedSubId]);

    const selectedSub =
        subcategories.find((s) => s.id === selectedSubId) ?? null;

    const thirdLevel = selectedSub?.children ?? [];

    return (
        <div className="mt-6 grid grid-cols-3 md:grid-cols-[260px,_1fr,_1fr] border border-gray-200 rounded-lg overflow-hidden">
            <div className="border-r bg-[#f5f5f5]">
                {mainCategories.map((cat) => {
                    const active = cat.id === selectedMain.id;
                    const hasChildren = (cat.children?.length ?? 0) > 0;

                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                                setSelectedMainId(cat.id);
                                setSelectedSubId(null);
                            }}
                            className={[
                                "flex w-full items-center justify-between px-4 py-3 text-sm border-b border-gray-200 last:border-b-0",
                                active ? "bg-[#e6f6f9] text-[#002f34] font-semibold" : "",
                            ].join(" ")}
                        >
                            <span className={isArabic ? "ml-auto text-right" : ""}>
                                {getLabel(cat)}
                            </span>
                            {hasChildren && (
                                <span className="text-lg">{isArabic ? "←" : "›"}</span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="border-r bg-white">
                {subcategories.length === 0 ? (
                    <div className="p-6 text-sm text-gray-600">
                        {t("postAd.noSubcategories") ||
                            "No subcategories available for this category."}
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {subcategories.map((sub) => {
                            const active = selectedSub?.id === sub.id;
                            const hasChildren = (sub.children?.length ?? 0) > 0;

                            return (
                                <button
                                    key={sub.id}
                                    type="button"
                                    onClick={() => setSelectedSubId(sub.id)}
                                    className={[
                                        "flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition",
                                        active ? "bg-gray-100 font-semibold" : "",
                                    ].join(" ")}
                                >
                                    <span className={isArabic ? "ml-auto text-right" : ""}>
                                        {getLabel(sub)}
                                    </span>
                                    {hasChildren && (
                                        <span className="text-lg">{isArabic ? "←" : "›"}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="bg-white">
                {thirdLevel.length > 0 && (
                    <div className="divide-y divide-gray-200">
                        {thirdLevel.map((child) => {
                            const hasChildren = (child.children?.length ?? 0) > 0;
                            return (
                                <button
                                    key={child.id}
                                    type="button"
                                    className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition"
                                >
                                    <span className={isArabic ? "ml-auto text-right" : ""}>
                                        {getLabel(child)}
                                    </span>
                                    {hasChildren && (
                                        <span className="text-lg">{isArabic ? "←" : "›"}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
