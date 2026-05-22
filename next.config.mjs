/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET: "omnia-dev-secret-no-db",
  },
};

export default nextConfig;