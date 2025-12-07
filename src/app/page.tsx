import HomeCategories from "@/components/home/HomeCategories";
import HomeAds from "@/components/home/HomeAds";

export default function HomePage() {
  return (
    <div className="w-full">
      <section className="mt-6">
        <HomeCategories />
      </section>

      <HomeAds />
    </div>
  );
}
