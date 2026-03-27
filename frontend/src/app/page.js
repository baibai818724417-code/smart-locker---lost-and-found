'use client'; 

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link'; 

// 1. Chỉ dùng "function Footer" (Xóa export default)
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Phần Logo / Tên dự án */}
        <div className="text-center md:text-left">
          <p className="text-xl font-bold text-blue-700">Smart Locker UIT</p>
          <p className="text-sm text-gray-500 mt-1">
            Hệ thống tủ khóa thông minh & Hỗ trợ tìm đồ thất lạc.
          </p>
        </div>

        {/* Các đường dẫn liên kết */}
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/about" className="hover:text-blue-700 transition-colors">
            Về dự án
          </Link>
          <Link href="/how-it-works" className="hover:text-blue-700 transition-colors">
            Cách hoạt động
          </Link>
          <Link href="/contact" className="hover:text-blue-700 transition-colors">
            Liên hệ hỗ trợ
          </Link>
        </div>
      </div>
      
      {/* Phần Copyright */}
      <div className="bg-gray-50 py-4 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Phát triển bởi melimee Dành cho sinh viên UIT.
        </p>
      </div>
    </footer>
  );
}

// 2. Đây là trang chính của bạn (Giữ export default)
export default function HomePage() {
  const [user, setUser] = useState(null);

  // Theo dõi trạng thái đăng nhập của người dùng
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    // Bọc toàn bộ trang bằng 1 div có flex-col và min-h
    <div className="flex flex-col min-h-[calc(100vh-73px)] bg-gray-50">
      
      {/* Sửa thẻ main: dùng flex-grow để đẩy footer xuống đáy */}
      <main className="flex-grow px-6 py-10">
        <section className="mx-auto max-w-5xl rounded-3xl bg-white px-8 py-14 shadow-lg">
          <div className="max-w-3xl">
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              Website tìm kiếm đồ vật thất lạc - UIT
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-blue-700">
              Giúp sinh viên UIT đăng tin mất đồ và nhặt được đồ trong trường
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Bạn có thể đăng bài khi bị mất đồ, hoặc đăng thông tin khi nhặt được
              đồ để người khác dễ tìm lại hơn thông qua hệ thống tủ khóa thông minh.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/posts"
                className="rounded-xl bg-blue-700 px-6 py-3 font-medium text-white hover:bg-blue-800 transition-all"
              >
                Xem danh sách bài đăng
              </Link>

              <Link
                href={user ? "/create" : "/login"}
                className="rounded-xl border border-blue-700 px-6 py-3 font-medium text-blue-700 hover:bg-blue-50 transition-all"
              >
                {user ? "Đăng bài ngay" : "Đăng nhập để đăng bài"}
              </Link>
            </div>

            {user && (
              <p className="mt-4 text-sm text-green-600 font-medium">
                Chào mừng trở lại, {user.email}!
              </p>
            )}
          </div>
        </section>
      </main>

      {/* 3. Gọi thẻ Footer hiển thị ở cuối cùng */}
      <Footer />
    </div>
  );
}