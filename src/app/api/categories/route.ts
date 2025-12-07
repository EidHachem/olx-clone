import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch("https://www.olx.com.lb/api/categories", {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }

    const data = await res.json();
    return NextResponse.json(data);
}
