import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, fetchData, fetchDetail } from "../api/todoService";

// Todos 목록 가져오는 훅
export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchData,
  });
};

// id와 일치하는 Todo 가져오는 훅
export const useGetTodo = (todoId) => {
  return useQuery({
    queryKey: ["todos", todoId],
    queryFn: () => fetchDetail(todoId),
  });
};

// Todo 추가하는 훅
export const useAddTodo = () => {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryclient.invalidateQueries(["todos"]);
    },
  });
};
