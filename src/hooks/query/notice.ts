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
  const { data: notices } = useQuery({
    queryKey: ["getNoticeList"],
    queryFn: () => getNoticeList(storeId),
  });
  return { notices };
}

function usePostNotice() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate } = useMutation({
    mutationKey: ["postNotice"],
    mutationFn: (body: PostNoticeBody) => postNotice(storeId, body),
  });
  const postNoticeMutate = (body: PostNoticeBody) => {
    mutate(body);
  };
  return { postNoticeMutate };
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
  const putNoticeMutate = (noticeId: string, body: PostNoticeBody) => {
    mutate({ noticeId, body });
  };
  return { putNoticeMutate };
}

export { useGetNotice, usePostNotice, usePutNotice };
