import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lost and Found UIT",
  description: "Website tìm kiếm đồ vật thất lạc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <a href="/" className="text-xl font-bold text-blue-700">
              Lost & Found UIT
            </a>

            <nav className="flex gap-4 text-sm font-medium">
              <a href="/" className="text-gray-700 hover:text-blue-700">
                Trang chủ
              </a>
              <a href="/posts" className="text-gray-700 hover:text-blue-700">
                Danh sách
              </a>
              <a href="/create" className="text-gray-700 hover:text-blue-700">
                Đăng bài
              </a>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}