import { NextRequest, NextResponse } from "next/server";
// import { getConnectedAddressForUser } from "@/utils/fc";
// import { mintNft, balanceOf } from "@/utils/mint";
import {FrameHTMLType, PinataFDK} from "pinata-fdk";
import {Type} from '../utils/enums'

const fdk = new PinataFDK({
    pinata_jwt: process.env.PINATA_JWT as string,
    pinata_gateway: process.env.PINATA_GATEWAY_URL as string,
});

export async function GET(req: NextRequest, res: NextResponse) {
    return getResponse()
}

async function getResponse()
{
    try {
        const frameMetadata = await fdk.getFrameMetadata({
            buttons: [
                { label: "Start"}
            ],
            aspect_ratio: "1:1",
            cid: `QmU4k5wdN4fmUxN4JMUC6pQAESu179GeN4a7Uy5b186TWw`,
            post_url: `${process.env.BASE_URL}/api/morpho?type=reload`,
        });
        return new NextResponse(frameMetadata);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error });
    }
}

