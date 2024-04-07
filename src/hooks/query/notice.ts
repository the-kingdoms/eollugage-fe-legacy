import {
  PostNoticeBody,
  getNoticeList,
  postNotice,
  putNotice,
} from "@/apis/notice";
import { storeIdAtom } from "@/data/global";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

function useGetNotice() {
  const [storeId] = useAtom(storeIdAtom);
  const { data } = useQuery({
    queryKey: ["getNoticeList"],
    queryFn: () => getNoticeList(storeId),
  });
  return { data };
}

function usePostNotice() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate } = useMutation({
    mutationKey: ["postNotice"],
    mutationFn: (body: PostNoticeBody) => postNotice(storeId, body),
  });
  return { mutate };
}

function usePutNotice() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate } = useMutation({
    mutationKey: ["putNotice"],
    mutationFn: ({
      noticeId,
      body,
    }: {
      noticeId: string;
      body: PostNoticeBody;
    }) => {
      return putNotice(storeId, noticeId, body);
    },
  });
  return { mutate };
}

export { useGetNotice, usePostNotice, usePutNotice };
