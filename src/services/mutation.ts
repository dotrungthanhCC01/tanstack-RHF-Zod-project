// File mutation: các hook THAY ĐỔI dữ liệu (tạo / sửa / xoá).
// Không tự chạy như useQuery, chỉ chạy khi gọi mutate(data).
// Thứ tự: gọi API → onSuccess hoặc onError → onSettled
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "./api";
import type { Post } from "@/types/post.type";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Gọi API tạo post. data = cái bạn truyền vào mutate(data)
    mutationFn: (data: Omit<Post, "id">) => createPost(data),

    // API thành công.
    // createdPost = dữ liệu API trả về (chính là cái createPost return), đã có id do server tạo
    onSuccess: (createdPost) => {
      console.log("Tạo thành công, id:", createdPost.id);
      const newPost: Post = { ...createdPost, id: Date.now() };
      queryClient.setQueryData<Post[]>(["posts"], (old) => {
        // 2. Cache chưa có dữ liệu → không đụng vào
        if (!old) return old;

        // 3. Có dữ liệu → mảng mới, post mới ở đầu
        return [newPost, ...old];
      });
    },

    // API lỗi
    onError: (error) => {
      console.error("Tạo thất bại:", error.message);
    },

    // Luôn chạy cuối (dù thành công hay lỗi): tải lại danh sách posts
    //vi goi api gia len neu goi lai GET thi van hien 100 ban post trong api ghì đè lên
    // onSettled: () => {
    //   return queryClient.invalidateQueries({ queryKey: ["posts"] });
    // },
  });
};
