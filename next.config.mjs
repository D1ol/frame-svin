/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects(){
        return [
            {
                source: '/poker',
                destination: 'https://discord.gg/superform?event=1266488316652421181',
                permanent: false
            }
        ]
    }
};

export default nextConfig;