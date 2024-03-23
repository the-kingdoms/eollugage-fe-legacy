import { PostStoreBody, getStore, postStore } from "@/apis/store";
import { storeIdAtom } from "@/data/global";
import { useGetMyQueryKey } from "@/hooks/query/my";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

function useGetStore() {
  const [storeId] = useAtom(storeIdAtom);
  const { data } = useQuery({
    queryKey: ["getStore"],
    queryFn: () => getStore(storeId),
  });
  return { data };
}

function usePostStore() {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["postStore"],
    mutationFn: (body: PostStoreBody) => postStore(body),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [useGetMyQueryKey],
      });
    },
  });
  return { mutate };
}

export { useGetStore, usePostStore };
