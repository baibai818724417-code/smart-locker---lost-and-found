async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Không thể tải danh sách bài đăng");
  }

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-blue-700">Danh sách bài đăng</h1>

        <div className="mt-8 grid gap-4">
          {posts.length === 0 ? (
            <p>Chưa có bài đăng nào.</p>
          ) : (
            posts.map((post) => (
              <a
                key={post.id}
                href={`/posts/${post.id}`}
                className="block rounded-xl bg-white p-5 shadow"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    {post.type}
                  </span>
                </div>

                <p className="mt-2 text-gray-600">{post.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {post.category} • {post.location}
                </p>
              </a>
            ))
          )}
        </div>
      </div>
    </main>
  );
}