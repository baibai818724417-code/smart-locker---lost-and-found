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

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-blue-700">{post.title}</h1>

        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            <strong>Loại:</strong>{" "}
            {post.type === "lost" ? "Đồ thất lạc" : "Đồ nhặt được"}
          </p>

          <p>
            <strong>Danh mục:</strong> {post.category}
          </p>

          <p>
            <strong>Địa điểm:</strong> {post.location}
          </p>

          <p>
            <strong>Thời gian:</strong>{" "}
            {new Date(post.eventTime).toLocaleString("vi-VN")}
          </p>

          <p>
            <strong>Mô tả:</strong> {post.description}
          </p>

          <p>
            <strong>Người liên hệ:</strong> {post.contactName}
          </p>

          <p>
            <strong>Số điện thoại:</strong> {post.contactPhone || "Chưa có"}
          </p>

          <p>
            <strong>Email:</strong> {post.contactEmail || "Chưa có"}
          </p>
        </div>
      </div>
    </main>
  );
}