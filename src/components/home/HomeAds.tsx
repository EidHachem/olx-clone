"use client";

import { useEffect, useState } from "react";
import { HomeAd, HomeSectionKey } from "@/lib/mock-data";
import { useTranslation } from "@/hooks/useTranslation";

type SectionGroup = {
    key: HomeSectionKey;
    ads: HomeAd[];
};

const SECTION_ORDER: HomeSectionKey[] = [
    "carsForSale",
    "apartmentsForRent",
    "mobilePhones",
];

async function getAds(): Promise<HomeAd[]> {
    const res = await fetch("/api/home-ads");
    if (!res.ok) {
        throw new Error("Failed to load ads");
    }
    return res.json();
}

export default function HomeAds() {
    const t = useTranslation();
    const [sections, setSections] = useState<SectionGroup[]>([]);
    const [loading, setLoading] = useState(true);

    const formatPostedAt = (postedAt: string) => {
        const [dayStr, monthStr, yearStr] = postedAt.split("-");
        const day = Number(dayStr);
        const month = Number(monthStr);
        const year = Number(yearStr);

        const postedDate = new Date(year, month - 1, day);
        const now = new Date();

        const diffMs = now.getTime() - postedDate.getTime();
        const diffDays = Math.max(
            0,
            Math.floor(diffMs / (1000 * 60 * 60 * 24))
        );

        if (diffDays === 0) {
            return t("home.posted.today");
        }

        if (diffDays === 1) {
            return `1 ${t("home.posted.dayAgoSuffix")}`;
        }

        return `${diffDays} ${t("home.posted.daysAgoSuffix")}`;
    };


    useEffect(() => {
        let isMounted = true;

        getAds().then((ads) => {
            if (!isMounted) return;

            const grouped: Record<HomeSectionKey, HomeAd[]> = {
                carsForSale: [],
                apartmentsForRent: [],
                mobilePhones: [],
            };

            ads.forEach((ad) => {
                grouped[ad.section].push(ad);
            });

            const orderedSections: SectionGroup[] = SECTION_ORDER
                .map((key) => ({
                    key,
                    ads: grouped[key],
                }))
                .filter((section) => section.ads.length > 0);

            setSections(orderedSections);
            setLoading(false);
        });

        return () => {
            isMounted = false;
        };
    }, []);


    if (loading) {
        return (
            <section className="mt-10">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-200 rounded-lg p-3 animate-pulse"
                        >
                            <div className="h-32 bg-gray-200 rounded mb-3" />
                            <div className="h-4 bg-gray-200 rounded mb-2" />
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                            <div className="h-3 bg-gray-200 rounded w-2/3" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <div className="mt-10 space-y-10">
            {sections.map((section) => (
                <section key={section.key}>
                    <div className="flex items-baseline justify-between mb-3">
                        <h2 className="text-lg font-semibold text-[#002f34]">
                            {t(`home.sections.${section.key}`)}
                        </h2>
                        <button className="text-xs text-[#002f34] hover:underline">
                            {t("home.viewMore") || "View more"}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {section.ads.map((ad) => (
                            <article
                                key={ad.id}
                                className="bg-white border border-[#e6e6e6] rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="h-44 bg-gray-100 overflow-hidden">
                                    <img
                                        src={ad.imageUrl}
                                        alt={ad.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-3 space-y-2 relative">
                                    <div className="flex justify-between items-start">
                                        <p className="text-[#ff4c36] font-semibold text-sm uppercase">
                                            {ad.price}
                                        </p>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="#4c4c4c"
                                            className="w-5 h-5 hover:stroke-[#002f34] transition-colors"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5A4.63 4.63 0 0012 6.108a4.63 4.63 0 00-4.312-2.358C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                            />
                                        </svg>
                                    </div>

                                    <p className="text-sm font-medium text-[#002f34] leading-snug line-clamp-2 min-h-[40px]">
                                        {ad.title}
                                    </p>

                                    <div className="flex items-center gap-1 text-xs text-[#4c4c4c]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="#4c4c4c"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.5 10.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 7.5v-5m0 5a4.5 4.5 0 00-4.5 4.5m9 0A4.5 4.5 0 0012 7.5m0 9v5"
                                            />
                                        </svg>
                                        <span>{ad.meta}</span>
                                    </div>

                                    <p className="text-xs text-[#4c4c4c]">{ad.location}</p>

                                    <p className="text-[11px] text-gray-500">
                                        {formatPostedAt(ad.postedAt)}
                                    </p>
                                </div>
                            </article>

                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
