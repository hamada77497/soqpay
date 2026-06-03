/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' https://sdk.minepi.com 'unsafe-inline' 'unsafe-eval';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
