"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "../layout/LanguageProvider";
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

type Props = {
    initialCategoryKey: PostAdCategoryId;
    categories: OlxCategory[];
};

export default function PostAdDynamicCategoryStep({
    initialCategoryKey,
    categories,
}: Props) {
    const t = useTranslation();
    const { language } = useLanguage();
    const isArabic = language === "ar";
    const router = useRouter();

    const mainCategories = categories.filter((c) => c.level === 0);
    const defaultMain =
        mainCategories.find((c) => c.slug === initialCategoryKey) ??
        mainCategories[0];

    const [selectedMainId, setSelectedMainId] = useState<number>(
        defaultMain?.id ?? mainCategories[0]?.id
    );
    const [selectedSubId, setSelectedSubId] = useState<number | null>(null);

    const selectedMain = categories.find((c) => c.id === selectedMainId)!;
    const subcategories = selectedMain.children ?? [];
    const selectedSub =
        selectedSubId != null
            ? subcategories.find((s) => s.id === selectedSubId) ?? null
            : null;
    const thirdLevelChildren = selectedSub?.children ?? [];

    const getLabel = (cat: OlxCategory) =>
        isArabic ? cat.name_l1 || cat.name : cat.name;

    const handleNavigateToAttributes = (
        slug: string | undefined,
        mainCategory: OlxCategory,
        targetCategory: OlxCategory
    ) => {
        if (!slug) return;

        const mainLabel = getLabel(mainCategory);
        const subLabel = getLabel(targetCategory);

        const params = new URLSearchParams({
            slug,
            mainCategory: mainLabel,
            subCategory: subLabel,
        });

        router.push(`/post-ad/attributes?${params.toString()}`);
    };


    return (
        <div className="mt-6 grid grid-cols-3 md:grid-cols-[260px,_1fr,_1fr] border border-gray-200 rounded-lg overflow-hidden">
            <div className="border-r border-gray-200 bg-[#f5f5f5]">
                {mainCategories.map((cat) => {
                    const isActive = cat.id === selectedMainId;
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
                                isActive
                                    ? "bg-[#e6f6f9] text-[#002f34] font-semibold"
                                    : "bg-[#f5f5f5] text-[#002f34]",
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

            <div className="border-r border-gray-200 bg-white">
                {subcategories.length === 0 ? (
                    <div className="p-6 text-sm text-gray-600">
                        {t("postAd.noSubcategories") ||
                            "Subcategories for this category are not configured yet."}
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {subcategories.map((sub) => {
                            const isActive = sub.id === selectedSubId;
                            const hasChildren = (sub.children?.length ?? 0) > 0;

                            return (
                                <button
                                    key={sub.id}
                                    type="button"
                                    onClick={() => {
                                        if (hasChildren) {
                                            setSelectedSubId(sub.id);
                                        } else {
                                            handleNavigateToAttributes(sub.slug, selectedMain, sub);
                                        }
                                    }}
                                    className={[
                                        "flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-[#f5f5f5] transition",
                                        isActive ? "bg-gray-100 font-semibold" : "",
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
                {thirdLevelChildren.length === 0 ? (
                    <div className="p-6 text-sm text-gray-500">
                        {t("postAd.chooseSubcategory") || ""}
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {thirdLevelChildren.map((child) => {
                            const hasChildren = (child.children?.length ?? 0) > 0;

                            return (
                                <button
                                    key={child.id}
                                    type="button"
                                    onClick={() => {
                                        handleNavigateToAttributes(child.slug, selectedMain, child);
                                    }}
                                    className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-[#f5f5f5] transition"
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
