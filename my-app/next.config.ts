import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // allowedDevOrigins:true,
  // allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev','192.168.29.192'],
  allowedDevOrigins: ['http://192.168.29.192:3000', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  experimental: {allowedDevOrigins: ["http://192.168.29.192:3000",  "http://localhost:3000", "http://127.0.0.1:3000"]}
 
};

// module.exports = {  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],}
 
export default nextConfig;
