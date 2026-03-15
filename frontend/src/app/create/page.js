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
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-blue-700">Tạo bài đăng</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-500"
          >
            <option value="lost">Đồ thất lạc</option>
            <option value="found">Đồ nhặt được</option>
          </select>

          <input
            name="title"
            placeholder="Tên đồ vật"
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-500"
            required
          />

          <input
            name="category"
            placeholder="Danh mục"
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-500"
            required
          />

          <input
            name="location"
            placeholder="Địa điểm"
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-500"
            required
          />

          <input
            name="eventTime"
            type="datetime-local"
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-500"
            required
          />

          <input
            name="imageUrl"
            placeholder="Link ảnh"
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-500"
          />

          <input
            name="contactName"
            placeholder="Tên người liên hệ"
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-500"
            required
          />

          <input
            name="contactPhone"
            placeholder="Số điện thoại"
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-500"
          />

          <input
            name="contactEmail"
            placeholder="Email"
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-500"
          />

          <textarea
            name="description"
            placeholder="Mô tả chi tiết"
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-500"
            rows={5}
            required
          />

          <button className="rounded-lg bg-blue-700 px-5 py-3 text-white">
            Đăng bài
          </button>
        </form>
      </div>
    </main>
  );
}