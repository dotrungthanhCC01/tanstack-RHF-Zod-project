import { usePostsId, usePostsIdQueries } from "@/services/queries";

// Ví dụ: có danh sách id → gọi API chi tiết cho từng id
// Thực tế: giỏ hàng chỉ lưu id sản phẩm → cần lấy tên, giá từng sản phẩm để hiển thị
export default function PostId() {
  const { data } = usePostsId(); // lấy danh sách id
  const postsQueries = usePostsIdQueries(data); // mỗi id 1 query chi tiết
  return (
    <div>
      {postsQueries.map((item) => (
        <li key={item.data?.id}>
          <ul>id: {item.data?.id}</ul>
          <ul>title: {item.data?.title}</ul>
        </li>
      ))}
    </div>
  );
}
