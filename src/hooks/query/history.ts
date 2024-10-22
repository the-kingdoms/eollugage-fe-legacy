import {
  PostHistoryBody,
  PostHistoryStatusBody,
  deleteHistory,
  getAllMemberHistoryByDate,
  getHistoryList,
  getHistoryListByDate,
  postHistory,
  postHistoryStatus,
} from "@/apis/history";
import { myMemberIdAtom, storeIdAtom } from "@/data/global";
import { addWorkModalAtom } from "@/data/historyAtom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

interface PostHistoryParams {
  body: PostHistoryBody;
  memberId: string;
}

function useGetAllMemberHistoryByDate(date: string) {
  const [storeId] = useAtom(storeIdAtom);
  const { data } = useQuery({
    queryKey: ["getAllMemberHistoryByDate", date],
    queryFn: () => getAllMemberHistoryByDate(storeId, date),
  });

  return { data };
}

function useGetHistoryList(memberId: string | null) {
  const [storeId] = useAtom(storeIdAtom);
  const { data, refetch } = useQuery({
    queryKey: ["getHistoryList", memberId],
    queryFn: () => (memberId ? getHistoryList(storeId, memberId) : null),
  });

  return { data, refetch };
}

function useGetHistoryListByDate(memberId: string, date: string) {
  const [storeId] = useAtom(storeIdAtom);
  const { data } = useQuery({
    queryKey: ["getHistoryList", memberId, date],
    queryFn: () => getHistoryListByDate(storeId, memberId, date),
  });

  return { data };
}

function usePostHistory() {
  const [storeId] = useAtom(storeIdAtom);
  const [, setIsModalOpen] = useAtom(addWorkModalAtom);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["postHistory"],
    mutationFn: ({ body, memberId }: PostHistoryParams) =>
      postHistory(storeId, memberId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getHistoryList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllMemberHistory"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllMemberHistoryByDate"],
      });
      setIsModalOpen(false);
    },
  });

  return { mutate, isPending };
}

function usePostHistoryStatus() {
  const [storeId] = useAtom(storeIdAtom);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["postHistoryStatus"],
    mutationFn: ({
      memberId,
      historyId,
      status,
    }: {
      memberId: string;
      historyId: string;
      status: PostHistoryStatusBody["status"];
    }) => postHistoryStatus(storeId, memberId, historyId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllMemberHistory"],
      });
    },
  });

  return { mutate, isPending };
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
      queryClient.invalidateQueries({
        queryKey: ["getAllMemberHistoryByDate"],
      });
    },
  });

  return { mutate, isPending };
}

export {
  useDeleteHistory,
  useGetHistoryList,
  useGetAllMemberHistoryByDate,
  useGetHistoryListByDate,
  usePostHistory,
  usePostHistoryStatus,
};
