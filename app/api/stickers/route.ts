import { NextRequest, NextResponse } from 'next/server';
import {getFrameMetadata} from "@coinbase/onchainkit/frame";
import type {Metadata} from "next";
import {FrameHTMLType, PinataFDK} from "pinata-fdk";

const fdk = new PinataFDK({
    pinata_jwt: process.env.PINATA_JWT as string,
    pinata_gateway: process.env.PINATA_GATEWAY_URL as string,
});

export async function POST(req: NextRequest): Promise<Response> {
    const searchParams = req.nextUrl.searchParams
    const id:any = searchParams.get('id')??0
    const idAsNumber = parseInt(id);
    const nextId = idAsNumber+1;

    let frameConfig: FrameHTMLType  = {
        post_url: `${process.env.BASE_URL}/api/stickers?id=${nextId}`,
        image: {
            url: `${process.env.PINATA_GATEWAY_URL}/ipfs/${process.env.PINATA_CID}/${idAsNumber}.png`
        },
        buttons: [
            {
                label: "Show next"
            }
        ],
        aspect_ratio: "1:1",
    };

    if(idAsNumber == 4){
        frameConfig.buttons = [
            { label: "1"},
            { label: "2"},
            { label: "3" },
        ];
        frameConfig.post_url =  `${process.env.BASE_URL}/api/end`
        frameConfig.aspect_ratio = "1.91:1";
    }

    return new NextResponse(await fdk.getFrameMetadata(frameConfig));
}


export const dynamic = 'force-dynamic';