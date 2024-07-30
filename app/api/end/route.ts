import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
    const data = await req.json();
    console.log(data);
    const buttonId = data.untrustedData.buttonIndex;

    let path: string;

    if (buttonId > 0) {
        path = "poker";
    }
     else {
        path = "";
    }
    const headers = new Headers();
    headers.set("Location", `${process.env.NEXT_PUBLIC_BASE_URL}/`);
    return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${path}`,
        302,
    );
}

export const dynamic = "force-dynamic";