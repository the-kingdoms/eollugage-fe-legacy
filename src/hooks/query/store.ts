import { PostStoreBody, getStore, postStore } from "@/apis/store";
import { useMutation, useQuery } from "@tanstack/react-query";

function useGetStore(storeId: string) {
  return useQuery({
    queryKey: ["getStore"],
    queryFn: () => getStore(storeId),
  });
}

function usePostStore() {
  return useMutation({
    mutationKey: ["postStore"],
    mutationFn: (body: PostStoreBody) => postStore(body),
  });
}

export { useGetStore, usePostStore };
