export type HomeSectionKey = "carsForSale" | "apartmentsForRent" | "mobilePhones";

export type HomeAd = {
    id: string;
    title: string;
    price: string;
    location: string;
    meta: string;
    imageUrl: string;
    section: HomeSectionKey;
    postedAt: string;
};

export const HOME_ADS: HomeAd[] = [
    {
        id: "1",
        title: "Defender P400 HSE - 50,000 Km - Company source",
        price: "USD 92,000",
        location: "Dbaye, Metn",
        meta: "50,000 km • 2021",
        imageUrl: "/images/mock-car-1.webp",
        section: "carsForSale",
        postedAt: "01-07-2025",
    },
    {
        id: "2",
        title: "Range Rover Velar R-Dynamic - 2019",
        price: "USD 39,500",
        location: "Zalka, Metn",
        meta: "95,000 km • 2019",
        imageUrl: "/images/mock-car-2.webp",
        section: "carsForSale",
        postedAt: "02-12-2025",
    },
    {
        id: "3",
        title: "Toyota Corolla 2020 - Excellent Condition",
        price: "USD 18,000",
        location: "Beirut",
        meta: "30,000 km • 2020",
        imageUrl: "/images/mock-car-3.webp",
        section: "carsForSale",
        postedAt: "15-11-2025",
    },
    {
        id: "4",
        title: "Honda Civic 2018 - Well Maintained",
        price: "USD 15,500",
        location: "Jounieh, Keserwan",
        meta: "45,000 km • 2018",
        imageUrl: "/images/mock-car-4.webp",
        section: "carsForSale",
        postedAt: "20-11-2025",
    },
    {
        id: "5",
        title: "Furnished Apartment For Rent in Sin El Fil",
        price: "USD 1,000",
        location: "Sin El Fil, Metn",
        meta: "2 bed • 100 sqm",
        imageUrl: "/images/mock-apartment-1.jpeg",
        section: "apartmentsForRent",
        postedAt: "03-12-2025",
    },
    {
        id: "6",
        title: "Sea View Apartment – Achrafieh",
        price: "USD 1,500",
        location: "Achrafieh, Beirut",
        meta: "3 bed • 160 sqm",
        imageUrl: "/images/mock-apartment-2.jpg",
        section: "apartmentsForRent",
        postedAt: "04-12-2025",
    },
    {
        id: "7",
        title: "Cozy Studio in Downtown Beirut",
        price: "USD 800",
        location: "Downtown, Beirut",
        meta: "Studio • 60 sqm",
        imageUrl: "/images/mock-apartment-3.webp",
        section: "apartmentsForRent",
        postedAt: "05-12-2025",
    },
    {
        id: "8",
        title: "Spacious 4 Bedroom Apartment in Hamra",
        price: "USD 2,200",
        location: "Hamra, Beirut",
        meta: "4 bed • 180 sqm",
        imageUrl: "/images/mock-apartment-4.webp",
        section: "apartmentsForRent",
        postedAt: "06-12-2025",
    },
    {
        id: "9",
        title: "iPhone 13 Pro 256GB - Midnight",
        price: "USD 650",
        location: "Hamra, Beirut",
        meta: "Used • Excellent condition",
        imageUrl: "/images/mock-phone-1.jpg",
        section: "mobilePhones",
        postedAt: "07-12-2025",
    },
    {
        id: "10",
        title: "Samsung Galaxy S23 Ultra",
        price: "USD 780",
        location: "Jounieh, Keserwan",
        meta: "New • 256GB",
        imageUrl: "/images/mock-phone-2.webp",
        section: "mobilePhones",
        postedAt: "04-12-2025",
    },
    {
        id: "11",
        title: "Google Pixel 7 Pro - 128GB",
        price: "USD 700",
        location: "Beirut",
        meta: "New • 128GB",
        imageUrl: "/images/mock-phone-3.jpg",
        section: "mobilePhones",
        postedAt: "07-12-2025",
    },
    {
        id: "12",
        title: "OnePlus 11 - 256GB",
        price: "USD 650",
        location: "Tripoli",
        meta: "New • 256GB",
        imageUrl: "/images/mock-phone-4.png",
        section: "mobilePhones",
        postedAt: "05-12-2025",
    },
];

