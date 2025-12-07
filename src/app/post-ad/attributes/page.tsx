import PostAdAttributesForm from "@/components/post-ad/PostAdAttributesForm";

type CategoryFieldsResponse = Record<
    string,
    {
        flatFields: any[];
        childrenFields: any[];
        parentFieldLookup: Record<string, unknown>;
    }
>;

type PageProps = {
    searchParams: {
        slug?: string;
        mainCategory?: string;
        subCategory?: string;
    };
};

export default async function PostAttributesPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const slug = searchParams?.slug ?? "apartments-villas-for-sale";

    const mainCategory = searchParams.mainCategory ?? "";
    const subCategory = searchParams.subCategory ?? "";

    const categoryLabel = [mainCategory, subCategory].filter(Boolean).join(" / ");

    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ??
        `http://localhost:${process.env.PORT ?? 3000}`;

    const res = await fetch(
        `${baseUrl}/api/categoryFields?categorySlugs=${encodeURIComponent(slug)}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        return (
            <div className="w-full">
                <div className="mx-auto w-full max-w-5xl bg-white rounded-lg border border-gray-200 px-6 py-8">
                    <p className="text-red-600 text-sm">
                        Failed to load category fields. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    const data = (await res.json()) as CategoryFieldsResponse;
    const firstKey = Object.keys(data)[0];
    const flatFields = firstKey ? data[firstKey].flatFields : [];

    return (
        <div className="w-full">
            <div className="mx-auto w-full max-w-5xl bg-white rounded-lg border border-gray-200 px-6 py-8">
                <PostAdAttributesForm slug={slug} flatFields={flatFields} categoryLabel={categoryLabel} />
            </div>
        </div>
    );
}
