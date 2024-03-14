import { ApiResponse } from "@/apis/network";
import { PostHistoryBody, getHistoryList, postHistory } from "@/apis/history";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { myAtom, storeIdAtom } from "@/data/global";

function useGetHistoryList() {
  const [storeId] = useAtom(storeIdAtom);
  const [my] = useAtom(myAtom);
  const { data } = useQuery({
    queryKey: ["getHistoryList"],
    queryFn: () =>
      getHistoryList(storeId, String(my?.relationList[0].memberId)),
  });

  return { data };
}

function usePostHistory() {
  const [storeId] = useAtom(storeIdAtom);
  const [my] = useAtom(myAtom);
  const { mutate } = useMutation({
    mutationKey: ["postHistory"],
    mutationFn: (body: PostHistoryBody) =>
      postHistory(storeId, String(my?.relationList[0].memberId), body),
  });
  const postHistoryMutate = (body: PostHistoryBody) => {
    mutate(body);
  };
  return { postHistoryMutate };
}

export { useGetHistoryList, usePostHistory };
