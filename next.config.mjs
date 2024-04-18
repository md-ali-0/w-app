/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
                // port: '',
                // pathname: "/my-bucket/**"
            }
        ]
    },
    env: {
        API_KEY : "3c99c2f0f0b583aec270703dac172640",
    }
};

export default nextConfig;
