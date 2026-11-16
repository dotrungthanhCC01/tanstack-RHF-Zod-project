import type { Post } from "@/types/post.type";

import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getPostsId = async () => {
  const res = await axiosInstance.get<Post[]>("/posts");
  return res.data.map((item) => item.id); // [1,2,3]
};

export const getPost = async () => {
  const res = await axiosInstance.get<Post[]>("/posts");
  return res.data;
};

// Lấy 1 post theo id
export const getPostById = async (id: number) => {
  const res = await axiosInstance.get<Post>(`/posts/${id}`);
  return res.data;
};

export const createPost = async (data: Omit<Post, "id">) => {
  const res = await axiosInstance.post<Post>("/posts", data);
  return res.data;
};
