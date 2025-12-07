import Image from "next/image";

const CATEGORIES = [
  { label: "Vehicles", icon: "/images/vehicles.png" },
  { label: "Properties", icon: "/images/property.png" },
  { label: "Mobiles & Accessories", icon: "/images/mobile-phones-accessories.png" },
  { label: "Electronics & Appliances", icon: "/images/electronics-home-appliances.png" },
  { label: "Furniture & Decor", icon: "/images/home-furniture-decor.png" },
  { label: "Businesses & Industrial", icon: "/images/business-industrial.png" },
  { label: "Pets", icon: "/images/pets.png" },
  { label: "Kids & Babies", icon: "/images/kids-babies.png" },
  { label: "Sports & Equipment", icon: "/images/sports-equipment.png" },
  { label: "Hobbies", icon: "/images/hobbies-music-art-books.png" },
  { label: "Jobs", icon: "/images/jobs.png" },
  { label: "Fashion & Beauty", icon: "/images/fashion-beauty.png" },
  { label: "Services", icon: "/images/services.png" },
];

export default function HomeCategories() {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-[#002f34] mb-4">
        All categories
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            className="flex flex-col items-center gap-2 text-sm text-[#002f34] focus:outline-none"
          >
            <div className="h-20 w-20 flex items-center justify-center">
              <Image
                src={cat.icon}
                alt={cat.label}
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
            <span className="text-center leading-tight font-medium">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
