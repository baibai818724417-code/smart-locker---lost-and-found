export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white px-8 py-14 shadow">
        <div className="max-w-3xl">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Website tìm kiếm đồ vật thất lạc
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-blue-700">
            Giúp sinh viên đăng tin mất đồ và nhặt được đồ trong trường
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Bạn có thể đăng bài khi bị mất đồ, hoặc đăng thông tin khi nhặt được
            đồ để người khác dễ tìm lại hơn.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/posts"
              className="rounded-xl bg-blue-700 px-5 py-3 font-medium text-white"
            >
              Xem danh sách bài đăng
            </a>

            <a
              href="/create"
              className="rounded-xl border border-blue-700 px-5 py-3 font-medium text-blue-700"
            >
              Đăng bài ngay
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}