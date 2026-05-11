/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_BACKEND_API: process.env.PUBLIC_BACKEND_API,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
}

export default nextConfig
