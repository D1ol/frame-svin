import { getFrameMetadata } from '@coinbase/onchainkit/frame';

import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Show me stickers"
    }
  ],
  image: {
    src: `${process.env.PINATA_GATEWAY_URL}/ipfs/${process.env.PINATA_CID}/0.png`,
    aspectRatio: "1:1"
  },
  post_url: `${process.env.BASE_URL}/api/stickers?id=1`,
});

export const metadata: Metadata = {
  title: 'Superform poker stickers rate',
  description: 'A frame telling about stickers pack from CryptoCat',
  openGraph: {
    title: 'Poker pack',
    description: 'A frame telling about stickers pack from CryptoCat',
    images: [`${process.env.PINATA_GATEWATY_URL}/ipfs/${process.env.PINATA_CID}/0.png`],
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