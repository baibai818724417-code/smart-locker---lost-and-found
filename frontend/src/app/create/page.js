"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/posts");
    } else {
      alert("Đăng bài thất bại");
    }
  };

  return (
    <main className="h-[calc(100vh-73px)] overflow-hidden px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-blue-700">Tạo bài đăng</h1>
        <p className="mt-2 text-gray-600">
          Điền thông tin bên dưới để đăng bài đồ thất lạc hoặc đồ nhặt được.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 text-black outline-none placeholder:text-gray-500 focus:border-blue-500"
          >
            <option value="lost">Đồ thất lạc</option>
            <option value="found">Đồ nhặt được</option>
          </select>

          <input
            name="title"
            placeholder="Tên đồ vật"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 text-black outline-none placeholder:text-gray-500 focus:border-blue-500"
            required
          />

          <input
            name="category"
            placeholder="Danh mục"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 text-black outline-none placeholder:text-gray-500 focus:border-blue-500"
          />

          <input
            name="location"
            placeholder="Địa điểm"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 text-black outline-none placeholder:text-gray-500 focus:border-blue-500"
            required
          />

          <input
            name="eventTime"
            type="datetime-local"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 text-black outline-none placeholder:text-gray-500 focus:border-blue-500"
            min="2024-01-01T00:00"
            max="2999-12-31T23:59"
            required
          />

          <input
            name="imageUrl"
            placeholder="Link hình ảnh"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 text-black outline-none placeholder:text-gray-500 focus:border-blue-500"
          />

          <input
            name="contactName"
            placeholder="Tên người liên hệ"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 text-black outline-none placeholder:text-gray-500 focus:border-blue-500"
            required
          />

          <input
            name="contactPhone"
            placeholder="Số điện thoại"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 text-black outline-none placeholder:text-gray-500 focus:border-blue-500"
          />

          <input
            name="contactEmail"
            placeholder="Email"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 text-black outline-none placeholder:text-gray-500 focus:border-blue-500"
          />

          <textarea
            name="description"
            placeholder="Mô tả chi tiết"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 text-black outline-none placeholder:text-gray-500 focus:border-blue-500"
            rows={5}
            required
          />

          <button className="rounded-xl bg-blue-700 px-5 py-3 font-medium text-white">
            Đăng bài
          </button>
        </form>
      </div>
    </main>
  );
}