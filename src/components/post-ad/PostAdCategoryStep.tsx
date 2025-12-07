"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import {
    POST_AD_CATEGORIES,
    PostAdCategoryId,
} from "@/lib/postAdCategories";
import { useLanguage } from "../layout/LanguageProvider";

type Props = {
    onSelectCategory: (id: PostAdCategoryId) => void;
};

export default function PostAdCategoryStep({ onSelectCategory }: Props) {
    const t = useTranslation();
    const pathname = usePathname();
    const { language } = useLanguage();

    const direction = language === "ar" ? "rtl" : "ltr";

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {POST_AD_CATEGORIES.map((cat) => {
                const label = t(`home.categories.${cat.id}`);

                return (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => onSelectCategory(cat.id)}
                        className="flex items-center justify-between w-full rounded-lg border border-[#e6e6e6] bg-white px-4 py-4 hover:border-[#23a6f0] hover:shadow-sm transition"
                    >
                        <>
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#ffce32] overflow-hidden">
                                    <Image
                                        src={cat.image}
                                        alt={label}
                                        width={48}
                                        height={48}
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm md:text-base font-medium text-[#002f34]">
                                    {label}
                                </span>
                            </div>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#002f34"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                                style={direction === "rtl" ? { transform: "rotate(180deg)" } : {}}
                            >
                                <path d="M9 5l6 7-6 7" />
                            </svg>
                        </>
                    </button>
                );
            })}
        </div>
    );
}
