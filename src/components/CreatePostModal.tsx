import { useCreatePost } from "@/services/mutation";
import { createPostSchema, type CreatePostInput } from "@/types/post.schema";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreatePostModal({
  isOpen,
  onClose,
}: CreatePostModalProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema), // ← đưa schema cho zodResolver
    defaultValues: {
      userId: 0,
      title: "",
      body: "",
    },
  });

  const { mutate, isPending } = useCreatePost();
  const onSubmit = (data: CreatePostInput) => {
    mutate(data, {
      onSuccess: () => {
        (reset(), onClose());
      },
    });
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    isOpen && (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center">
        <div className="bg-white w-full max-w-lg px-3 py-1.5 rounded-2xl">
          {/* header */}
          <div className="flex items-center justify-between ">
            <p>tao bai viet</p>
            <button onClick={handleClose}>x</button>
          </div>
          {/* body */}
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            {/* User ID */}
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700"
              >
                User ID
              </label>
              <input
                id="userId"
                type="number"
                {...register("userId", {
                  valueAsNumber: true,
                })}
                // valueAs de truyen tu string thanh number khi sumbmit vi input de
                //  type="number" nhung khi submit van thanh string vd: userId: "10"
                className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-xs transition focus:outline-hidden ${
                  errors.userId
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                }`}
                placeholder="Nhập ID người dùng (VD: 1)"
              />
              {errors.userId && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.userId.message}
                </p>
              )}
            </div>
            {/* title */}
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                title:
              </label>
              <input
                id="title"
                type="text"
                {...register("title", {})}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-xs transition focus:outline-hidden ${
                  errors.title
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                }`}
                placeholder="nhap title"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>
            {/* body */}
            <div>
              <label
                htmlFor=""
                className="block  text-sm font-medium text-gray-700"
              >
                body:
              </label>
              <textarea
                id="body"
                rows={5}
                {...register("body", {})}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-xs transition focus:outline-hidden ${
                  errors.body
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                }`}
              />
              {errors.body && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.body.message}
                </p>
              )}
            </div>
            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={handleClose}
                // disabled={createPostMutation.isPending}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                // disabled={createPostMutation.isPending}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
              >
                {isPending ? "dang tao" : "tao post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
