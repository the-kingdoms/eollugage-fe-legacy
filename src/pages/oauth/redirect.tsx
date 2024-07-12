import { PostRelationBody } from "@/apis/relation";
import { myAtom } from "@/data/global";
import { usePostPlanList } from "@/hooks/query/plan";
import { usePostRelation, useStaffJoin } from "@/hooks/query/relation";
import { InviteResponse, InviteDataType } from "@/screen/manage/ShareLink";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
  const { push } = useRouter();
  const [my] = useAtom(myAtom);
  const { mutate: postRelationMutate } = usePostRelation();
  const { mutate: postPlanListMutate } = usePostPlanList();
  const { mutate: staffJoinMutate } = useStaffJoin();

  async function getInviteData(inviteDataId: string) {
    const response = await axios.get<InviteResponse>(
      `/api/dynamoDB?id=${inviteDataId}`,
    );
    return response.data;
  }

  useEffect(() => {
    if (my?.id === undefined || my?.id === null) return;
    if (localStorage.getItem("inviteDataId") !== null) {
      const inviteDataId = String(localStorage.getItem("inviteDataId"));
      getInviteData(inviteDataId).then(data => {
        const body: PostRelationBody = {
          role: "STAFF",
          position: data.inviteData.position,
        };
        staffJoinMutate({
          storeId: data.inviteData.storeId,
          memberId: my?.id as string,
          body,
          inviteSchedule: data.inviteData.schedule,
        });
      });
    } else if (my?.relationList.length === 0) {
      push("/signup");
    } else {
      push("/main");
    }
  }, [my]);
}
