import { PostRelationBody } from "@/apis/relation";
import { myAtom } from "@/data/global";
import { useGetInviteData } from "@/hooks/query/dynamodb";
import { useStaffJoin } from "@/hooks/query/relation";
import { InviteResponse } from "@/screen/manage/ShareLink";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
  const { push } = useRouter();
  const [my] = useAtom(myAtom);
  const { data: inviteResponse, isSuccess } = useGetInviteData();
  const { mutate: staffJoinMutate } = useStaffJoin();

  useEffect(() => {
    if (isSuccess && inviteResponse) {
      const inviteData = inviteResponse.inviteData;
      const body: PostRelationBody = {
        role: "STAFF",
        position: inviteData.position,
      };
      staffJoinMutate({
        storeId: inviteData.storeId,
        memberId: my?.id as string,
        body,
        inviteSchedule: inviteData.schedule,
      });
    }
  }, [isSuccess]);
}
