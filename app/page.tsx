import { getFrameMetadata } from '@coinbase/onchainkit/frame';

import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  accepts: {},
  buttons: [
    {
      label: "Begin"
    }
  ],
  image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${process.env.NEXT_PUBLIC_CID}/0.png`,
  post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
});

export const metadata: Metadata = {
  title: 'Superform poker stickers rate',
  description: 'A frame telling about stickers pack from CryptoCat',
  openGraph: {
    title: 'Poker pack',
    description: 'A frame telling about stickers pack from CryptoCat',
    images: [`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${process.env.NEXT_PUBLIC_CID}/0.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
      <>
        <h1>Superform poker stickers rate</h1>
      </>
  );
}