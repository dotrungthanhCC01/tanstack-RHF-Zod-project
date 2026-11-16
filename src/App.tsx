import { useState } from "react";
import { usePost } from "./services/queries";
import PostCard from "./components/PostCard";
import PostId from "./components/PostId";
import CreatePostModal from "./components/CreatePostModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isPending, isError, error } = usePost();

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Danh sách Post</h1>
            <p className="text-sm text-gray-500">
              Quản lý bài viết với TanStack Query & React Hook Form
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 font-medium text-amber-950 shadow-sm transition hover:bg-amber-500 active:scale-95 cursor-pointer"
          >
            Tạo post
          </button>
        </div>

        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <div className="flex flex-col gap-5">
          {data?.map((item) => (
            <PostCard key={item.id} post={item} />
          ))}
          <PostId />
        </div>
      </div>
    </div>
  );
}
