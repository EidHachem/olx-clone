"use client";

import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

const CATEGORIES = [
    { key: "vehicles", icon: "/images/vehicles.png" },
    { key: "properties", icon: "/images/property.png" },
    { key: "mobilesAccessories", icon: "/images/mobile-phones-accessories.png" },
    { key: "electronicsAppliances", icon: "/images/electronics-home-appliances.png" },
    { key: "furnitureDecor", icon: "/images/home-furniture-decor.png" },
    { key: "businessesIndustrial", icon: "/images/business-industrial.png" },
    { key: "pets", icon: "/images/pets.png" },
    { key: "kidsBabies", icon: "/images/kids-babies.png" },
    { key: "sportsEquipment", icon: "/images/sports-equipment.png" },
    { key: "hobbies", icon: "/images/hobbies-music-art-books.png" },
    { key: "jobs", icon: "/images/jobs.png" },
    { key: "fashionBeauty", icon: "/images/fashion-beauty.png" },
    { key: "services", icon: "/images/services.png" }
];

export default function HomeCategories() {
    const t = useTranslation();

    return (
        <section className="mt-8">
            <h2 className="text-lg font-semibold text-[#002f34] mb-4">
                {t("home.allCategories")}
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-8">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.key}
                        className="flex flex-col items-center gap-2 text-sm text-[#002f34] focus:outline-none hover:cursor-pointer"
                    >
                        <div className="h-20 w-20 flex items-center justify-center">
                            <Image
                                src={cat.icon}
                                alt={t(`home.categories.${cat.key}`)}
                                width={90}
                                height={90}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-center leading-tight font-bold text-lg">
                            {t(`home.categories.${cat.key}`)}
                        </span>
                    </button>
                ))}

            </div>
        </section>
    );
}
