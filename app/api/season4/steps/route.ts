import {NextRequest, NextResponse} from 'next/server';
import {FrameHTMLType, PinataFDK} from "pinata-fdk";

const fdk = new PinataFDK({
    pinata_jwt: process.env.PINATA_JWT as string,
    pinata_gateway: process.env.PINATA_GATEWAY_URL as string,
});

export async function POST(req: NextRequest): Promise<Response> {
    const searchParams = req.nextUrl.searchParams
    const id: any = searchParams.get('id') ?? 0
    const idAsNumber = parseInt(id);
    const nextId = idAsNumber + 1;

    let frameConfig: FrameHTMLType = {
        post_url: `${process.env.BASE_URL}/api/season4/steps?id=${nextId}`,
        image: {
            url: `${process.env.PINATA_GATEWAY_URL}/ipfs/${process.env.SEASON4_CID}/${idAsNumber}.jpg`
        },
        buttons: [
            {
                label: "Next ➡️"
            },
        ],
        aspect_ratio: "1:1",
    };
    let frameButtons = frameConfig.buttons
    if (idAsNumber == 0) {
        if (frameConfig.buttons) {
            frameConfig.buttons.push({
                label: "Mint NFT",
                action: "link",
                target: "https://www.superform.xyz/rewards/superfrens/?tournamentId=3&seasonId=1"
            });
        }
    }

    if (idAsNumber == 1) {
        if (frameConfig.buttons) {
            frameConfig.buttons.push({
                label: "Join guild",
                action: "link",
                target: "https://discord.com/invite/superform"
            });
        }
    }

    if (idAsNumber == 2) {
        if (frameConfig.buttons) {
            frameConfig.buttons.push({
                label: "Buy it",
                action: "link",
                target: "https://opensea.io/collection/superfrensbysuperform"
            });
        }
    }

    if (idAsNumber == 3) {
        frameConfig.buttons = [
            {
                label: "Deposit",
                action: "link",
                target: "https://www.superform.xyz/"
            },
            {
                label: "Go back 🔙",
                action: "post",
                target: `${process.env.BASE_URL}/api/season4?type=reload`
            },
            {
                label: "Ribbit 🐸🔊",
                action: "link",
                target: `https://x.com/superformxyz/status/1821184971639599470`
            }
        ];

        frameConfig.post_url =  `${process.env.BASE_URL}/api/season4?type=reload`
    }

    return new NextResponse(await fdk.getFrameMetadata(frameConfig));
}


export const dynamic = 'force-dynamic';