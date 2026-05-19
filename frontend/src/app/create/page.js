"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from '@/lib/firebase';
import { createPostAndReserveLocker } from '@/services/lockerService'; 

export default function CreatePage() {
  const router = useRouter();

  // Đã cập nhật state theo form mới
  const [form, setForm] = useState({
    type: "lost",
    title: "",
    description: "",
    category: "",
    location: "",
    eventTime: "",
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
      const result = await createPostAndReserveLocker(form, currentUser.email);

      if (form.type === "found") {
        const confirmLocker = confirm("Thành công! CHUYỂN SANG HỆ THỐNG LOCKER ĐỂ NHẬN MÃ PIN");
        
        if (confirmLocker) {
          const targetUrl = `https://25522081-dev.github.io/smart-locker/campus-locker.html?userEmail=${encodeURIComponent(currentUser.email)}&action=show_pin&lockerId=${result.lockerId}&pin=${result.pin}`;
          window.location.href = targetUrl;
          return; 
        }
      }
      
      alert("Đăng bài thành công!");
      const targetUrl = `https://25522081-dev.github.io/smart-locker/campus-locker.html?userEmail=${encodeURIComponent(currentUser.email)}&action=show_pin&lockerId=${result.lockerId}&pin=${result.pin}`;
      window.location.href = targetUrl;
      router.push("/posts");

    } catch (err) {
      console.error("Lỗi khi đăng bài:", err);
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
            <label className="mb-2 block text-sm font-medium text-gray-700">Loại bài đăng <span className="text-red-500">*</span></label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 bg-white" required>
              <option value="lost">Đồ thất lạc</option>
              <option value="found">Đồ nhặt được</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Tên đồ vật <span className="text-red-500">*</span></label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" required />
          </div>

          {/* Thay input bằng select cho Danh mục */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Danh mục <span className="text-red-500">*</span></label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 bg-white" required>
              <option value="" disabled>-- Chọn danh mục --</option>
              <option value="Đồ điện tử">Đồ điện tử (Điện thoại, Laptop, Tai nghe...)</option>
              <option value="Giấy tờ">Giấy tờ (CCCD, Thẻ SV, Bằng lái...)</option>
              <option value="Đồ dùng cá nhân">Đồ dùng cá nhân (Balo, Ví, Chìa khóa...)</option>
              <option value="Quần áo/Trang sức">Quần áo, Trang sức, Phụ kiện</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          {/* Thay input bằng select cho Địa điểm */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Địa điểm <span className="text-red-500">*</span></label>
            <select name="location" value={form.location} onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 bg-white" required>
              <option value="" disabled>-- Chọn địa điểm khu vực --</option>
              <option value="Tòa A">Tòa A</option>
              <option value="Tòa B">Tòa B</option>
              <option value="Tòa C">Tòa C</option>
              <option value="Tòa E">Tòa E</option>
              <option value="Nhà xe sinh viên">Nhà xe sinh viên</option>
              <option value="Ký túc xá">Ký túc xá</option>
              <option value="Khu vực ngoài sân">Khu vực ngoài sân / Đường đi</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Thời gian <span className="text-red-500">*</span></label>
            <input name="eventTime" value={form.eventTime} type="datetime-local" onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" required />
          </div>

          {/* Ràng buộc Số điện thoại */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Số điện thoại liên hệ <span className="text-red-500">*</span></label>
            <input 
              name="contactPhone" 
              type="tel"
              value={form.contactPhone}
              onChange={handleChange} 
              pattern="(0[3|5|7|8|9])+([0-9]{8})" 
              title="Vui lòng nhập số điện thoại hợp lệ (10 chữ số, bắt đầu bằng 03, 05, 07, 08 hoặc 09)"
              placeholder="Ví dụ: 0912345678"
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" 
              required 
            />
          </div>

          {/* Ràng buộc Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Email liên hệ <span className="text-red-500">*</span></label>
            <input 
              name="contactEmail" 
              type="email"
              value={form.contactEmail}
              onChange={handleChange} 
              placeholder="Ví dụ: sinhvien@uit.edu.vn"
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" 
              required 
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Mô tả chi tiết <span className="text-red-500">*</span></label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500" rows={5} required />
          </div>

          <button type="submit" className="rounded-xl bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800 transition-all">
            Đăng bài
          </button>
        </form>
      </div>
    </main>
  );
}