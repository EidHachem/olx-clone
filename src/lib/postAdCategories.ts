export type PostAdCategoryId =
    | "vehicles"
    | "properties"
    | "mobilesAccessories"
    | "electronicsAppliances"
    | "furnitureDecor"
    | "businessesIndustrial"
    | "pets"
    | "kidsBabies"
    | "sportsEquipment"
    | "hobbies"
    | "jobs"
    | "fashionBeauty"
    | "services";

export type PostAdCategory = {
    id: PostAdCategoryId;
    image: string;
};

export type PostAdSubcategory = {
    id: string;
    categoryId: PostAdCategoryId;
    labelKey: string;
};

export const POST_AD_CATEGORIES: PostAdCategory[] = [
    { id: "vehicles", image: "/images/vehicles.png" },
    { id: "properties", image: "/images/property.png" },
    {
        id: "mobilesAccessories",
        image: "/images/mobile-phones-accessories.png",
    },
    {
        id: "electronicsAppliances",
        image: "/images/electronics-home-appliances.png",
    },
    { id: "furnitureDecor", image: "/images/home-furniture-decor.png" },
    { id: "businessesIndustrial", image: "/images/business-industrial.png" },
    { id: "pets", image: "/images/pets.png" },
    { id: "kidsBabies", image: "/images/kids-babies.png" },
    { id: "sportsEquipment", image: "/images/sports-equipment.png" },
    { id: "hobbies", image: "/images/hobbies-music-art-books.png" },
    { id: "jobs", image: "/images/jobs.png" },
    { id: "fashionBeauty", image: "/images/fashion-beauty.png" },
    { id: "services", image: "/images/services.png" },
];

export const POST_AD_SUBCATEGORIES: PostAdSubcategory[] = [
    {
        id: "apartmentsForSale",
        categoryId: "properties",
        labelKey: "postAd.subcategories.properties.apartmentsForSale",
    },
    {
        id: "apartmentsForRent",
        categoryId: "properties",
        labelKey: "postAd.subcategories.properties.apartmentsForRent",
    },
    {
        id: "commercialsForSale",
        categoryId: "properties",
        labelKey: "postAd.subcategories.properties.commercialsForSale",
    },
    {
        id: "commercialsForRent",
        categoryId: "properties",
        labelKey: "postAd.subcategories.properties.commercialsForRent",
    },
    {
        id: "landsForSale",
        categoryId: "properties",
        labelKey: "postAd.subcategories.properties.landsForSale",
    },
    {
        id: "landsForRent",
        categoryId: "properties",
        labelKey: "postAd.subcategories.properties.landsForRent",
    },
    {
        id: "chaletsCabinsForSale",
        categoryId: "properties",
        labelKey: "postAd.subcategories.properties.chaletsCabinsForSale",
    },
    {
        id: "chaletsCabinsForRent",
        categoryId: "properties",
        labelKey: "postAd.subcategories.properties.chaletsCabinsForRent",
    },
    {
        id: "buildingsMultipleUnits",
        categoryId: "properties",
        labelKey: "postAd.subcategories.properties.buildingsMultipleUnits",
    },
    {
        id: "roomsForRent",
        categoryId: "properties",
        labelKey: "postAd.subcategories.properties.roomsForRent",
    },
    {
        id: "vacationRentalsGetaways",
        categoryId: "properties",
        labelKey:
            "postAd.subcategories.properties.vacationRentalsWeekendGetaways",
    },
];
