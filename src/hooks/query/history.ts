import {
  PostHistoryBody,
  deleteHistory,
  getAllMemberHistory,
  getHistoryList,
  postHistory,
} from "@/apis/history";
import { myMemberIdAtom, storeIdAtom } from "@/data/global";
import { addWorkModalAtom } from "@/data/historyAtom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

function useGetAllMemeberHistory() {
  const [storeId] = useAtom(storeIdAtom);
  const { data } = useQuery({
    queryKey: ["getAllMemberHistory"],
    queryFn: () => getAllMemberHistory(storeId),
  });

  return { data };
}

function useGetHistoryList(memberId: string) {
  const [storeId] = useAtom(storeIdAtom);
  const { data, isLoading } = useQuery({
    queryKey: ["getHistoryList"],
    queryFn: () => getHistoryList(storeId, memberId),
  });

  return { data, isLoading };
}

function usePostHistory() {
  const [storeId] = useAtom(storeIdAtom);
  const [memberId] = useAtom(myMemberIdAtom);
  const [, setIsModalOpen] = useAtom(addWorkModalAtom);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["postHistory"],
    mutationFn: (body: PostHistoryBody) => postHistory(storeId, memberId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getHistoryList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllMemberHistory"],
      });
      setIsModalOpen(false);
    },
  });

  return { postHistoryMutate: mutate, isPending };
}

function useDeleteHistory() {
  const [storeId] = useAtom(storeIdAtom);
  const [memberId] = useAtom(myMemberIdAtom);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteHistory"],
    mutationFn: (historyId: string) =>
      deleteHistory(storeId, memberId, historyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getHistoryList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllMemberHistory"],
      });
    },
  });

  return { deleteHistoryMutate: mutate, isPending };
}

export {
  useDeleteHistory,
  useGetAllMemeberHistory,
  useGetHistoryList,
  usePostHistory,
};
