import axios from "axios";

export const todoApi = axios.create({
  baseURL: "http://localhost:4000",
});

// Todos 가져오기
export const fetchData = async () => {
  const response = await todoApi.get("/todos");
  return response.data;
};

// 좋아요 업데이트 API
export const updateLike = async (id, liked) => {
  const { data } = await todoApi.patch(`/todos/${id}`, {
    liked,
  });
  return data;
};
