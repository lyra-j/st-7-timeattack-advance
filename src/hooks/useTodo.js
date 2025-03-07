import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData, updateLike } from "../api/todos";

// Todos 가져오는 훅
export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchData,
  });
};

// 좋아요 업데이트 훅
export const useUpdateLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, currentLiked }) => updateLike(id, !currentLiked),
    onMutate: async ({ id, currentLiked }) => {
      //쿼리취소
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      // 현재상태 snapshot
      const previousTodos = queryClient.getQueryData(["todos"]);
      //ui 즉시반영
      queryClient.setQueryData(["todos"], (prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, liked: !currentLiked } : todo
        )
      );
      return { previousTodos };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};
