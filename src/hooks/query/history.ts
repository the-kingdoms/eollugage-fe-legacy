import { ApiResponse } from "@/apis/network";
import { PostHistoryBody, getHistoryList, postHistory } from "@/apis/history";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { myAtom, storeIdAtom } from "@/data/global";
import { addWorkModalAtom } from "@/data/historyAtom";

function useGetHistoryList() {
  const [storeId] = useAtom(storeIdAtom);
  const [my] = useAtom(myAtom);
  const { data } = useQuery({
    queryKey: ["getHistoryList"],
    queryFn: () => getHistoryList(storeId, String(my?.id)),
  });

  return { data };
}

function usePostHistory() {
  const [storeId] = useAtom(storeIdAtom);
  const [my] = useAtom(myAtom);
  const [, setIsModalOpen] = useAtom(addWorkModalAtom);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["postHistory"],
    mutationFn: (body: PostHistoryBody) =>
      postHistory(storeId, String(my?.id), body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getHistoryList"],
      });
      setIsModalOpen(false);
    },
  });

  return { postHistoryMutate: mutate, isPending };
}

export { useGetHistoryList, usePostHistory };
