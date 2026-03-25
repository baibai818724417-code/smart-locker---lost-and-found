async function getPosts(type, keyword) {
  const params = new URLSearchParams();

  if (type) params.set("type", type);
  if (keyword) params.set("keyword", keyword);

  const query = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Không thể tải danh sách bài đăng");
  }

  return res.json();
}

export default async function PostsPage({ searchParams }) {
  const params = await searchParams;
  const type = params?.type || "";
  const keyword = params?.keyword || "";
  const posts = await getPosts(type, keyword);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Danh sách bài đăng</h1>
          <p className="mt-2 text-gray-600">
            Các bài đăng đồ thất lạc và đồ nhặt được
          </p>
        </div>

        <form action="/posts" className="mb-6 rounded-2xl bg-white p-4 shadow">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              name="keyword"
              defaultValue={keyword}
              placeholder="Tìm theo tên đồ vật, mô tả, địa điểm..."
              className="h-12 w-full rounded-xl border border-gray-300 px-4 text-black outline-none placeholder:text-gray-500"
            />

            {type && <input type="hidden" name="type" value={type} />}

            <button className="h-12 cursor-pointer whitespace-nowrap rounded-xl bg-blue-700 px-6 font-medium text-white">
              Tìm kiếm
            </button>
          </div>
        </form>

        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <a
              href={keyword ? `/posts?keyword=${encodeURIComponent(keyword)}` : "/posts"}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                type === ""
                  ? "bg-blue-700 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              Tất cả
            </a>

            <a
              href={
                keyword
                  ? `/posts?type=lost&keyword=${encodeURIComponent(keyword)}`
                  : "/posts?type=lost"
              }
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                type === "lost"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              Thất lạc
            </a>

            <a
              href={
                keyword
                  ? `/posts?type=found&keyword=${encodeURIComponent(keyword)}`
                  : "/posts?type=found"
              }
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                type === "found"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              Nhặt được
            </a>
          </div>

          <a
            href="/posts"
            className="whitespace-nowrap rounded-xl bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Xóa bộ lọc
          </a>
        </div>

        <div className="grid gap-4">
          {posts.length === 0 ? (
            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-600">Chưa có bài đăng nào.</p>
            </div>
          ) : (
            posts.map((post) => (
              <a
                key={post.id}
                href={`/posts/${post.id}`}
                className="block rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-gray-600">{post.description}</p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      post.type === "lost"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {post.type === "lost" ? "Thất lạc" : "Nhặt được"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {post.category}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {post.location}
                  </span>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </main>
  );
}