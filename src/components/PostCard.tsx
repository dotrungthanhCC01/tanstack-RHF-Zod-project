import type { Post } from "@/types/post.type";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
          #{post.id}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 font-medium text-gray-700">
            {post.userId}
          </span>
          User {post.userId}
        </span>
      </div>

      <h2 className="mb-2 line-clamp-2 text-lg font-semibold capitalize text-gray-900">
        {post.title}
      </h2>

      <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">{post.body}</p>
    </article>
  );
}
