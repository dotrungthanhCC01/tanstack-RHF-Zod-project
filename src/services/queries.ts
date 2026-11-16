import { useQueries, useQuery } from "@tanstack/react-query";
import { getPost, getPostById, getPostsId } from "./api";

export const usePostsId = () => {
  return useQuery({
    queryKey: ["posts", "ids"],
    queryFn: () => getPostsId(),
  });
};

export const usePost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPost(),
    staleTime: Infinity, // de khi chuyen tab trinh duyet khong bi tai lai
  });
};

// useQueries: gọi NHIỀU query cùng lúc, mỗi query lưu 1 cache riêng.
// Ví dụ: giỏ hàng chỉ lưu id sản phẩm [12, 45, 78] → gọi API chi tiết từng sản phẩm để hiện tên, giá.
// Vì sao không dùng useQuery? Số sản phẩm không biết trước, mà React cấm gọi hook trong vòng lặp.
// Khi nào dùng? Chỉ khi server KHÔNG có API trả cả danh sách, chỉ cho lấy từng cái.
// Không phải lúc nào cũng dùng: lấy 1 cái → useQuery; server có API danh sách → useQuery gọi 1 lần.
export const usePostsIdQueries = (ids: (number | undefined)[] | undefined) => {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["post", id],
        queryFn: () => getPostById(id!),
      };
    }),
  });
};
