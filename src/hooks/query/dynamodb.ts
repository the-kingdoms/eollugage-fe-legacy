import { InviteResponse, getInviteData, postInviteData } from "@/apis/dynamodb";
import { myAtom } from "@/data/global";
import { copyLink } from "@/libs/copy";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

function useGetInviteData() {
  const [my] = useAtom(myAtom);
  const inviteId = localStorage.getItem("inviteDataId");
  const { data, isSuccess } = useQuery({
    queryKey: ["getInviteData"],
    queryFn: () => getInviteData(inviteId as string),
    enabled: !(my?.id === undefined || my?.id === null || inviteId === null),
  });

  return { data, isSuccess };
}

function usePostInviteData(inviteId: string) {
  const { mutate, isSuccess } = useMutation({
    mutationKey: ["getInviteData"],
    mutationFn: (body: InviteResponse) => postInviteData(body),
    onSuccess: () => copyLink(inviteId),
  });

  return { mutate, isSuccess };
}

export { useGetInviteData, usePostInviteData };
