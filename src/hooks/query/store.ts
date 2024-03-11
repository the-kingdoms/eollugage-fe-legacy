import { ApiResponse } from "@/apis/network";
import { PostStoreBody, getStore, postStore } from "@/apis/store";
import { storeIdAtom } from "@/data/global";
import { useGetMyQueryKey } from "@/hooks/query/my";
import {
  MutateOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAtom } from "jotai";

function useGetStore() {
  const [storeId] = useAtom(storeIdAtom);
  const { data: store } = useQuery({
    queryKey: ["getStore"],
    queryFn: () => getStore(storeId),
  });
  return { store };
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
  const postStoreMutate = (
    body: PostStoreBody,
    options?: MutateOptions<ApiResponse, Error, PostStoreBody>,
  ) => {
    mutate(body, options);
  };
  return { postStoreMutate };
}

export { useGetStore, usePostStore };
