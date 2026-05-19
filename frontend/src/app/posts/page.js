"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase"; 
import Link from "next/link";

// Hàm hỗ trợ loại bỏ dấu tiếng Việt và đưa về chữ thường
const removeAccents = (str) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu sắc, huyền, hỏi, ngã, nặng
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setPosts(postsData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết từ Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // THUẬT TOÁN TÌM KIẾM NỚI LỎNG
  const filteredPosts = posts.filter((post) => {
    // Nếu không nhập gì, hiển thị tất cả
    const cleanQuery = removeAccents(searchQuery).trim();
    if (!cleanQuery) return true;

    // Chuẩn hóa tiêu đề và mô tả của bài viết về dạng không dấu
    const cleanTitle = removeAccents(post.title);
    const cleanDesc = removeAccents(post.description);
    const cleanLocation = removeAccents(post.location);
    
    // Tách từ khóa người dùng nhập thành các từ đơn lẻ (Ví dụ: "do mixi" -> ["do", "mixi"])
    const queryWords = cleanQuery.split(/\s+/);
    
    // Điều kiện nới lỏng: TẤT CẢ các từ người dùng gõ đều phải xuất hiện trong bài viết (không quan trọng thứ tự)
    return queryWords.every(word => 
      cleanTitle.includes(word) || 
      cleanDesc.includes(word) || 
      cleanLocation.includes(word)
    );
  });

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-73px)] p-10 flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xl font-medium text-blue-700">Đang tải dữ liệu...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] p-6 md:p-10 bg-gray-50">
      <div className="mx-auto max-w-6xl">
        
        {/* Khu vực Tiêu đề, Nút thêm mới và Ô tìm kiếm */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-blue-700">Danh sách đồ thất lạc & nhặt được</h1>
            <Link 
              href="/create" 
              className="bg-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-800 transition-all shadow-md shrink-0"
            >
              + Đăng bài mới
            </Link>
          </div>
          
          {/* Ô tìm kiếm */}
          <div className="w-full">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                🔍
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm vật phẩm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all bg-white"
              />
            </div>
          </div>
        </div>

        {/* Danh sách bài viết sau khi lọc */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white p-14 rounded-3xl shadow-sm border border-gray-100 text-center text-gray-500">
            <p className="text-xl">
              {posts.length === 0 
                ? "Hiện chưa có bài đăng nào." 
                : "Không tìm thấy bài viết nào phù hợp với từ khóa của bạn."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col h-full relative overflow-hidden">
                
                {/* Loại bài đăng */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                    post.type === 'lost' 
                      ? 'bg-red-100 text-red-700 border border-red-200' 
                      : 'bg-green-100 text-green-700 border border-green-200'
                  }`}>
                    {post.type === 'lost' ? 'Tìm đồ thất lạc' : 'Nhặt được đồ'}
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('vi-VN') : 'Vừa xong'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-5 line-clamp-3 flex-grow">{post.description}</p>
                
                {/* Chi tiết vị trí & Tủ */}
                <div className="space-y-3 mb-5 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">📍</span> 
                    <span><strong>Địa điểm:</strong> {post.location}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">⏰</span> 
                    <span><strong>Thời gian:</strong> {new Date(post.eventTime).toLocaleString('vi-VN')}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">📞</span> 
                    <span><strong>Liên hệ:</strong> {post.contact}</span>
                  </p>
                  {post.assignedLocker && (
                    <p className="flex items-start gap-2 text-blue-700">
                      <span className="mt-0.5">📦</span> 
                      <span><strong>Vị trí tủ:</strong> <span className="font-bold text-lg">{post.assignedLocker}</span></span>
                    </p>
                  )}
                </div>
                
                {/* THÔNG TIN LIÊN HỆ */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex flex-col gap-3">
                    
                    {post.contactPhone && (
                      <a 
                        href={`tel:${post.contactPhone}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-sm"
                      >
                        <span className="text-lg">📞</span> Gọi: {post.contactPhone}
                      </a>
                    )}

                   

                    <p className="text-[10px] text-gray-400 text-center italic mt-1 uppercase font-medium">
                      Xác minh kỹ trước khi trao đổi mã PIN
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}