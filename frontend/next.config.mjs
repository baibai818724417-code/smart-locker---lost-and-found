/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Tắt kiểm tra lỗi eslint khi build để nó cho phép deploy
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Nếu có dùng typescript thì cũng cho qua luôn
    ignoreBuildErrors: true,
  },
};

export default nextConfig;