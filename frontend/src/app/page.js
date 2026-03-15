export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold text-blue-700">
          Website Tìm Kiếm Đồ Vật Thất Lạc
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Nơi sinh viên đăng tin đồ bị mất hoặc đồ nhặt được trong trường.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/posts"
            className="rounded-lg bg-blue-700 px-5 py-3 text-white"
          >
            Xem danh sách
          </a>

          <a
            href="/create"
            className="rounded-lg border border-blue-700 px-5 py-3 text-blue-700"
          >
            Đăng bài
          </a>
        </div>
      </section>
    </main>
  );
}