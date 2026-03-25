'use client'; 

import { useEffect, useState } from 'react';
// 1. ĐÃ SỬA LẠI ĐƯỜNG DẪN TRỎ VÀO THƯ MỤC lib
import { auth } from '@/lib/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link'; 

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
    <main className="h-[calc(100vh-73px)] overflow-hidden px-6 py-10 bg-gray-50">
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
  );
}