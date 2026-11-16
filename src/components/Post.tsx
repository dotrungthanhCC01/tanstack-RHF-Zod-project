import { usePostsId } from "@/services/queries";

export default function Post() {
  const { data, isPending, isError, error, isFetching } = usePostsId();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Đang tải...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto mt-10 max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        Lỗi: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Danh sách Post</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            {isFetching && <span>🔄 đang cập nhật...</span>}
            <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">
              {data.length} posts
            </span>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {data.map((id) => (
            <li
              key={id}
              className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-400 hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-wide text-gray-400">Post</p>
              <p className="text-2xl font-semibold text-gray-800">#{id}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
