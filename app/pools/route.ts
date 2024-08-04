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
            cid: `QmUFYuohaqab7Gnqm3eDEFLvez3jHjHU3a25fFctByPjWu`,
            post_url: `${process.env.BASE_URL}/api/pools?type=reload`,
        });
        return new NextResponse(frameMetadata);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error });
    }
}

