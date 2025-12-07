import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://www.olx.com.lb/api/categoryFields";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const slug = url.searchParams.get("categorySlugs");

    if (!slug) {
        return NextResponse.json(
            { error: "categorySlugs query param is required" },
            { status: 400 }
        );
    }

    const remoteUrl = `${BASE_URL}?categorySlugs=${encodeURIComponent(
        slug
    )}&includeChildCategories=true&splitByCategoryIDs=true&flatChoices=true&groupChoicesBySection=true&flat=true`;

    const res = await fetch(remoteUrl, { next: { revalidate: 60 } });

    if (!res.ok) {
        return NextResponse.json(
            { error: "Failed to fetch category fields" },
            { status: 500 }
        );
    }

    const data = await res.json();
    return NextResponse.json(data);
}
