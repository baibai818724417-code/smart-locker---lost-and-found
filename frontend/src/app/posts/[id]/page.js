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

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Số điện thoại</p>
            <p className="mt-1 font-medium">{post.contactPhone || "Chưa có"}</p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 md:col-span-2">
            <p className="text-sm text-gray-500">Email</p>
            <p className="mt-1 font-medium">{post.contactEmail || "Chưa có"}</p>
          </div>
        </div>
      </div>
    </main>
  );
}