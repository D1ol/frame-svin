import { NextRequest, NextResponse } from 'next/server';
import {getFrameMetadata} from "@coinbase/onchainkit/frame";
import type {Metadata} from "next";
import {FrameHTMLType, PinataFDK} from "pinata-fdk";

const fdk = new PinataFDK({
    pinata_jwt: process.env.PINATA_JWT as string,
    pinata_gateway: process.env.PINATA_GATEWAY_URL as string,
});

export async function POST(req: NextRequest): Promise<Response> {
    let morphoFolder = 'QmUGRmTX7xExvcoRN6pzyE7TGTRB6JFMbGZRtBwGf7HozJ';

    const searchParams = req.nextUrl.searchParams
    const id:any = searchParams.get('id')??0
    const idAsNumber = parseInt(id);
    const nextId = idAsNumber+1;

    let frameConfig: FrameHTMLType  = {
        post_url: `${process.env.BASE_URL}/api/morpho?id=${nextId}`,
        image: {
            url: `${process.env.PINATA_GATEWAY_URL}/ipfs/${morphoFolder}/${nextId}.png`
        },
        buttons: [
            {
                label: "More"
            }
        ],
        aspect_ratio: "1:1",
    };

    if(idAsNumber == 4){
        frameConfig.buttons = [
            { label: "Morpho pools", action: "link" , target: "https://www.superform.xyz/protocol/morpho"},
            { label: "Others pools", action: "link" , target: "https://www.superform.xyz/protocols"},
            { label: "Morpho site", action: "link" , target: "https://morpho.org/"}
        ];
        frameConfig.post_url =  `${process.env.BASE_URL}/api/morpho?type=reload`
    }

    return new NextResponse(await fdk.getFrameMetadata(frameConfig));
}


export const dynamic = 'force-dynamic';