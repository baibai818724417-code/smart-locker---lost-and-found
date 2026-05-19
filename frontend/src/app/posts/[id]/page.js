async function getPost(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Không thể tải chi tiết bài đăng");
  }

  return res.json();
}

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  const hasValidImage =
    post.imageUrl &&
    (post.imageUrl.startsWith("http://") || post.imageUrl.startsWith("https://"));
    
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">{post.title}</h1>
            <p className="mt-2 text-gray-500">
              {new Date(post.eventTime).toLocaleString("vi-VN")}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
              post.type === "lost"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {post.type === "lost" ? "Thất lạc" : "Nhặt được"}
          </span>
        </div>

        {hasValidImage ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="mt-6 h-72 w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="mt-6 flex h-72 w-full items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
            Chưa có hình ảnh
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Danh mục</p>
            <p className="mt-1 font-medium">{post.category}</p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Địa điểm</p>
            <p className="mt-1 font-medium">{post.location}</p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 md:col-span-2">
            <p className="text-sm text-gray-500">Mô tả</p>
            <p className="mt-1 leading-7">{post.description}</p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Người liên hệ</p>
            <p className="mt-1 font-medium">{post.contactName}</p>
          </div>

          {/* Hiển thị cả 2 lựa chọn liên lạc ở trang Chi Tiết */}
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Số điện thoại
            </p>
            <p className="mt-1 font-medium text-blue-600">
              {post.contactPhone ? (
                <a href={`tel:${post.contactPhone}`} className="hover:underline">
                  {post.contactPhone}
                </a>
              ) : (
                <span className="text-gray-900">Chưa có</span>
              )}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 md:col-span-2">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              Email liên hệ
            </p>
            <p className="mt-1 font-medium text-blue-600">
              {post.contactEmail ? (
                <a href={`mailto:${post.contactEmail}`} className="hover:underline">
                  {post.contactEmail}
                </a>
              ) : (
                <span className="text-gray-900">Chưa có</span>
              )}
            </p>
          </div>
          
        </div>
      </div>
    </main>
  );
}