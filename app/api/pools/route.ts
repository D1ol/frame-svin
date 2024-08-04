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
                { label: "Ethena", action: "post", target: `${process.env.BASE_URL}/api/pools/ethena` },
                { label: "Morpho", action: "post", target: `${process.env.BASE_URL}/api/pools/morpho` },
                { label: "Others", action: "link", target: "https://www.superform.xyz/protocols" },
            ],
            aspect_ratio: "1:1",
            cid: `QmUFYuohaqab7Gnqm3eDEFLvez3jHjHU3a25fFctByPjWu`,
            post_url: `${process.env.BASE_URL}/api/pools`,
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
                label: "Show info"
            }
        ],
        aspect_ratio: "1:1",
    };

    let id  = 0;

    if(buttonId == 1)
    {
        type = Type.ETHENA
        let ethenaFolder = 'QmZ7jiKnmGUQDv4dNN5ViCHkTW169PYFzTujetvfXH9i9G';

        frameConfig.post_url = `${process.env.BASE_URL}/api/pools/ethena?id=${id}`
        frameConfig.image.url = `${process.env.PINATA_GATEWAY_URL}/ipfs/${ethenaFolder}/${id}.png`
    }

    if(buttonId == 2)
    {
        type = Type.MORPHO
        let morphoFolder = 'QmSZVk5HyjBxjfdiiz7AFbtD9hV7zbC3N4hbY2WwJLeGkC'

        frameConfig.post_url = `${process.env.BASE_URL}/api/pools/morpho?id=${id}`
        frameConfig.image.url = `${process.env.PINATA_GATEWAY_URL}/ipfs/${morphoFolder}/${id}.png`

    }



    return new NextResponse(await fdk.getFrameMetadata(frameConfig));
}