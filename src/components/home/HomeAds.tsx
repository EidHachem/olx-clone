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
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow cursor-pointer"
                            >
                                <div className="h-40 bg-gray-100 overflow-hidden">
                                    <img
                                        src={ad.imageUrl}
                                        alt={ad.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-3 space-y-1">
                                    <div className="text-[#002f34] font-semibold text-sm line-clamp-2">
                                        {ad.price}
                                    </div>
                                    <div className="text-xs text-gray-800 line-clamp-2">
                                        {ad.title}
                                    </div>
                                    <div className="text-[11px] text-gray-500">
                                        {ad.meta}
                                    </div>
                                    <div className="text-[11px] text-gray-500">
                                        {ad.location}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
