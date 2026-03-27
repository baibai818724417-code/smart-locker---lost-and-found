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
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 text-gray-900 antialiased`}
      >
        <header className="sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1">
            <a
              href="/"
              className="flex items-center gap-3 text-2xl font-bold tracking-tight text-blue-700 leading-none"
            >
              <img
                src="/uit-logo.png"
                alt="UIT Logo"
                width={70}
                height={50}
                className="block h-14 w-auto object-contain"
              />
              <span>Lost & Found UIT</span>
            </a>

            <nav className="flex items-center gap-2 text-sm font-medium">
              <a
                href="/"
                className="rounded-full px-4 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                Trang chủ
              </a>
              <a
                href="/posts"
                className="rounded-full px-4 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                Danh sách
              </a>
              <a
                href="/create"
                className="rounded-full px-4 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                Đăng bài
              </a>
              <a
                href="https://25522081-dev.github.io/smart-locker/campus-locker.html"
                className="rounded-full px-4 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                Campus locker
              </a>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}