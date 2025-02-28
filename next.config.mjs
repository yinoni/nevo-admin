/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    output: "export",
    env: {
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    },
};

export default nextConfig;
