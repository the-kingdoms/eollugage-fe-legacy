import { PostStoreBody, getStore, postStore } from "@/apis/store";
import { useGetMyQueryKey } from "@/hooks/query/my";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useGetStore(storeId: string) {
  return useQuery({
    queryKey: ["getStore"],
    queryFn: () => getStore(storeId),
  });
}

function usePostStore() {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["postStore"],
    mutationFn: (body: PostStoreBody) => postStore(body),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [useGetMyQueryKey],
      });
    },
  });
}

export { useGetStore, usePostStore };
