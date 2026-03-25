"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from '@/lib/firebase';
import { createPostAndReserveLocker } from '@/services/lockerService'; // Gọi service xịn của ông vào

export default function CreatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    type: "lost",
    title: "",
    description: "",
    category: "",
    location: "",
    eventTime: "",
    imageUrl: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("Bạn cần đăng nhập để đăng bài!");
      return;
    }

    try {
      // DÙNG FIREBASE SERVICE THAY CHO FETCH API
      const result = await createPostAndReserveLocker(form, currentUser.email);

      // Xử lý luồng chuyển hướng nếu là đồ nhặt được
      // Xử lý luồng chuyển hướng nếu là đồ nhặt được
      if (form.type === "found") {
        const confirmLocker = confirm("Thành công! CHUYỂN SANG HỆ THỐNG LOCKER ĐỂ NHẬN MÃ PIN");
        
        if (confirmLocker) {
          // Bắn email, hành động, ID tủ và mã PIN sang HTML
          const targetUrl = `https://25522081-dev.github.io/smart-locker/campus-locker.html?userEmail=${encodeURIComponent(currentUser.email)}&action=show_pin&lockerId=${result.lockerId}&pin=${result.pin}`;
          window.location.href = targetUrl;
          return; 
        }
      }
      
      // Nếu là đồ thất lạc hoặc người dùng bấm Cancel
      alert("Đăng bài thành công!");
      router.push("/posts");

    } catch (err) {
      console.error("Lỗi khi đăng bài:", err);
      // Nếu hết tủ trống thì Firebase sẽ quăng lỗi ra đây
      alert(err.message || "Đăng bài thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <main className="overflow-hidden px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-blue-700">Đăng bài và tạo mã PIN lưu trữ</h1>
        <p className="mt-2 text-gray-600">
          - Điền thông tin bên dưới để đăng bài đồ thất lạc hoặc đồ nhặt được.
        </p>
        <p className="mt-2 text-gray-600">
          - Sau khi đăng bài hệ thống sẽ tự chọn tủ cho bạn hãy làm theo hướng dẫn để nhận được mã pin giữ đồ.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Loại bài đăng *</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" required>
              <option value="lost">Đồ thất lạc</option>
              <option value="found">Đồ nhặt được</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Tên đồ vật *</label>
            <input name="title" onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Danh mục *</label>
            <input name="category" onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Địa điểm *</label>
            <input name="location" onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Thông tin liên lạc (Zalo, email...) *</label>
            <input name="contact" onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Thời gian *</label>
            <input name="eventTime" type="datetime-local" onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Mô tả chi tiết *</label>
            <textarea name="description" onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" rows={5} required />
          </div>

          <button type="submit" className="rounded-xl bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800 transition-all">
            Đăng bài
          </button>
        </form>
      </div>
    </main>
  );
}