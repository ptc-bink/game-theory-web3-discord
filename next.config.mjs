/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/:path*",
  //       headers: [
  //         // omitted for brevity...
  //       ]
  //     },
  //     {
  //       source: "/api/special-data",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "false" },
  //         { key: "Access-Control-Allow-Origin", value: "https://example.com" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date" },
  //       ]
  //     }
  //   ]
  // }
};

export default nextConfig;
