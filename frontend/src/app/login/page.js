"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; // Trỏ đúng vào nhà mới của firebase
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Xóa thông báo lỗi cũ nếu có

    try {
      // 1. Gọi Firebase kiểm tra tài khoản
      await signInWithEmailAndPassword(auth, email, password);
      
      alert("Đăng nhập thành công!");
      
      // 2. Đăng nhập xong thì đá về Trang chủ Next.js
      router.push("/"); 
    } catch (err) {
      console.error(err);
      setError("Sai email hoặc mật khẩu. Vui lòng thử lại!");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-blue-700">Đăng nhập</h1>
        
        {error && (
          <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 rounded-xl bg-blue-700 p-3 font-medium text-white hover:bg-blue-800 transition-all"
          >
            Đăng nhập
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          {/* ĐÂY LÀ CHỖ CHUYỂN HƯỚNG SANG TRANG ĐĂNG KÝ CỦA HTML */}
          <a 
            href="https://25522081-dev.github.io/smart-locker/register.html" 
            className="font-medium text-blue-700 hover:underline"
          >
            Đăng ký ngay
          </a>
        </p>
      </div>
    </main>
  );
}