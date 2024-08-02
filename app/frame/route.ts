import { NextRequest, NextResponse } from "next/server";
// import { getConnectedAddressForUser } from "@/utils/fc";
// import { mintNft, balanceOf } from "@/utils/mint";
import { PinataFDK } from "pinata-fdk";

const fdk = new PinataFDK({
    pinata_jwt: process.env.PINATA_JWT as string,
    pinata_gateway: process.env.PINATA_GATEWAY_URL as string,
});

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const frameMetadata = await fdk.getFrameMetadata({
            buttons: [{ label: "Show me stickers", action: "post" }],
            post_url: `${process.env.BASE_URL}api/stickers?id=1`,
            aspect_ratio: "1:1",
            cid: `Qmcp2mCmvCM15EFbAqsoUP7Epx69zrdWzg19fo82DUqXtZ`,
        });
        return new NextResponse(frameMetadata);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error });
    }
}

// export async function POST(req: NextRequest, res: NextResponse) {
//     const body = await req.json();
//     const fid = body.untrustedData.fid;
    // const address = await getConnectedAddressForUser(fid);
    // const balance = await balanceOf(address);
    // const { isValid, message } = await fdk.validateFrameMessage(body);
    // console.log(balance);
    // if (typeof balance === "number" && balance !== null && balance < 1) {
    //     try {
    //         const mint = await mintNft(address);
    //         console.log(mint);
    //         const frameMetadata = await fdk.getFrameMetadata({
    //             post_url: `${process.env.BASE_URL}/redirect`,
    //             buttons: [
    //                 { label: "Blog Tutorial", action: "post_redirect" },
    //                 { label: "Video Tutorial", action: "post_redirect" },
    //             ],
    //             aspect_ratio: "1:1",
    //             cid: "QmUx3kQH4vR2t7mTmW3jHJgJgJGxjoBsMxt6z1fkZEHyHJ",
    //         });
    //         if (isValid) {
    //             await fdk.sendAnalytics("frame-mint-tutorial-mint", body);
    //         }
    //
    //         return new NextResponse(frameMetadata);
    //     } catch (error) {
    //         console.log(error);
    //         return NextResponse.json({ error: error });
    //     }
    // } else {
    //     const frameMetadata = await fdk.getFrameMetadata({
    //         post_url: `${process.env.BASE_URL}/redirect`,
    //         buttons: [
    //             { label: "Blog Tutorial", action: "post_redirect" },
    //             { label: "Video Tutorial", action: "post_redirect" },
    //         ],
    //         aspect_ratio: "1:1",
    //         cid: "QmaaEbtsetwamJwfFPAQAFC6FAE1xeYsvF7EBKA8NYMjP2",
    //     });

        // return new NextResponse(frameMetadata);
    // }
// }