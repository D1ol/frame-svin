import { NextRequest, NextResponse } from 'next/server';
import {getFrameMetadata} from "@coinbase/onchainkit/frame";
import type {Metadata} from "next";
import {FrameHTMLType, PinataFDK} from "pinata-fdk";

const fdk = new PinataFDK({
    pinata_jwt: process.env.PINATA_JWT as string,
    pinata_gateway: process.env.PINATA_GATEWAY_URL as string,
});

export async function POST(req: NextRequest): Promise<Response> {
    const data = await req.json();
    console.log(data);
    const buttonId = data.untrustedData.buttonIndex;

    let path: string;
    console.log(`saved data ${buttonId}}`);

    // if (buttonId == 1) {
    //     path = "d1ol";
    // }else if (buttonId == 2) {
    //     path = "cryptoCat";
    // }else if (buttonId == 3) {
    //     path = "Poker";
    // }
    //  else {
    //     path = "";
    // }
    type FrameButtonMetadata = {
        label: string;
        action?: "post" | "post_redirect" | "mint" | "link" | "tx";
        target?: string;
    };

    const frameConfig: FrameHTMLType  = {

        buttons: [
            {label: "Frame author", action: "link", target:"https://warpcast.com/d1ol"},
            {label: "Sticker author", action: "link", target:"https://warpcast.com/cryptocatxch"},
            {label: "Poker event", action: "link", target:"https://discord.gg/superform?event=1266488316652421181"},
        ],
        aspect_ratio:  "1.91:1",
        cid:"QmVwzsAuJ1LuKofwyWY7NgFZwQ7RmH3ehSGzundzyfYkkT"
    };

    return new NextResponse(await fdk.getFrameMetadata(frameConfig));
}

export const dynamic = "force-dynamic";