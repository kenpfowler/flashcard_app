/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DOTNET_API_URL: process.env.DOTNET_API_URL,
    LOCAL_DOTNET_API_URL: process.env.LOCAL_DOTNET_API_URL,
  },
};

module.exports = nextConfig;
