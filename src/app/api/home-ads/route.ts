import { HOME_ADS } from "@/lib/mock-data";

export async function GET() {
    await new Promise((r) => setTimeout(r, 700));
    return Response.json(HOME_ADS);
}
