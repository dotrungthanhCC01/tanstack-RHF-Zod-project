import { z } from "zod";

export const createPostSchema = z.object({
  userId: z
    .number({ error: "vui long nhap UserId" }) // ô trống → NaN → báo lỗi này
    .int("UserId phai la so nguyen")
    .positive("UserId phai lon hon 0"),

  title: z
    .string({ error: "vui long nhap title" }) // lỗi khi không phải chuỗi
    .trim() // bỏ khoảng trắng 2 đầu
    .min(1, "vui long nhap title") // "" vẫn là chuỗi → cần min(1) để bắt buộc nhập
    .max(100, "title toi da 100 ky tu"),

  body: z
    .string({ error: "vui long nhap body" })
    .trim()
    .min(1, "body toi thieu 1 ky tu"),
});

// Type tự suy ra từ schema: { userId: number; title: string; body: string }
export type CreatePostInput = z.infer<typeof createPostSchema>;
