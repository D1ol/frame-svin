import { NextRequest, NextResponse } from "next/server";
// import { getConnectedAddressForUser } from "@/utils/fc";
// import { mintNft, balanceOf } from "@/utils/mint";
import {FrameHTMLType, PinataFDK} from "pinata-fdk";
import {Type} from '../../utils/enums'


const fdk = new PinataFDK({
    pinata_jwt: process.env.PINATA_JWT as string,
    pinata_gateway: process.env.PINATA_GATEWAY_URL as string,
});

async function getResponse()
{
    try {
        const frameMetadata = await fdk.getFrameMetadata({
            buttons: [
                {
                    label: "Superform Safari Tournament 4"
                },
                { label: "Join to us", action: "link", target: "https://www.superform.xyz/protocols" },
            ],
            aspect_ratio: "1:1",
            cid: `QmRCmrPWPSse7zTJMNwQYjRZTyKLGWpKHDLCy1NeoFkYiC`,
            post_url: `${process.env.BASE_URL}/api/season4/steps?id=0`,
        });
        return new NextResponse(frameMetadata);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {

    const data = await req.json();
    console.log(data);
    const searchParams = req.nextUrl.searchParams
    let type:any = searchParams.get('type')
    console.log(type)
    const buttonId = data.untrustedData.buttonIndex;

    if(type == Type.RELOAD)
    {
        return getResponse();
    }

    let frameConfig: FrameHTMLType  = {
        post_url: '',
        image: {
            url: ``
        },
        buttons: [
            {
                label: "Look at this.."
            }
        ],
        aspect_ratio: "1:1",
    };

    return new NextResponse(await fdk.getFrameMetadata(frameConfig));
}