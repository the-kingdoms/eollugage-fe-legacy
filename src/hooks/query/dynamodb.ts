import { getInviteData } from "@/apis/dynamodb";
import { myAtom } from "@/data/global";
import { useQuery } from "@tanstack/react-query";
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

export { useGetInviteData };
