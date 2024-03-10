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
  const { mutate: postNoticeMutation } = useMutation({
    mutationKey: ["postNoticeMutation"],
    mutationFn: (body: PostNoticeBody) => postNotice(storeId, body),
  });
  return { postNoticeMutation };
}

function usePutNotice() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate: putNoticeMutation } = useMutation({
    mutationKey: ["putNoticeMutation"],
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
  return { putNoticeMutation };
}

export { useGetNotice, usePostNotice, usePutNotice };
