import { todoApi } from "./todos";

// Todos목록 가져오는 API
export const fetchData = async () => {
  const { data } = await todoApi.get("/todos");
  return data;
};

// id와 일치하는 todo가져오는 API
export const fetchDetail = async (id) => {
  const { data } = await todoApi(`/todos/${id}`);
  return data;
};

// todo 추가 API
export const addTodo = async (newTodo) => {
  const { data } = await todoApi.post("/todos", newTodo);
  return data;
};
