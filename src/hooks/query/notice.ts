import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Notice,
  PostNoticeBody,
  getNoticeList,
  postNotice,
  putNotice,
} from "@/apis/notice";
import { useAtom } from "jotai";
import { storeIdAtom } from "@/data/global";
import { useEffect } from "react";

function useGetNotice() {
  const [storeId] = useAtom(storeIdAtom);
  const { data: notices } = useQuery({
    queryKey: ["notices"],
    queryFn: () => getNoticeList(storeId),
  });
  return { notices };
}

function usePostNotice() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate: postNoticeMutate } = useMutation({
    mutationKey: ["postNoticeMutation"],
    mutationFn: (body: PostNoticeBody) => postNotice(storeId, body),
  });
  return { postNoticeMutate };
}

function usePutNotice() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate: putNoticeMutate } = useMutation({
    mutationKey: ["putNoticeMutate"],
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
  return { putNoticeMutate };
}

export { useGetNotice, usePostNotice, usePutNotice };
