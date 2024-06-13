import { PostRelationBody } from "@/apis/relation";
import { myAtom } from "@/data/global";
import { usePostPlanList } from "@/hooks/query/plan";
import { usePostRelation } from "@/hooks/query/relation";
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

  async function getInviteData(inviteDataId: string) {
    const response = await axios.get<InviteResponse>(
      `/api/dynamoDB?id=${inviteDataId}`,
    );
    return response.data;
  }
  const createNewEmployee = (inviteData: InviteDataType, memberId: string) => {
    const body: PostRelationBody = {
      role: "STAFF",
      position: inviteData.position,
    };
    postRelationMutate(
      { storeId: inviteData.storeId, memberId: my?.id as string, body },
      {
        onSuccess: () =>
          postPlanListMutate({
            storeId: inviteData.storeId,
            memberId,
            inviteSchedule: inviteData.schedule,
          }),
        onError: () => console.log("fail"),
      },
    );
  };
  useEffect(() => {
    if (my?.id === undefined || my?.id === null) return;
    if (localStorage.getItem("inviteDataId") !== null) {
      const inviteDataId = String(localStorage.getItem("inviteDataId"));
      getInviteData(inviteDataId)
        .then(data => {
          createNewEmployee(data.inviteData, my?.id);
          localStorage.removeItem("inviteDataId");
          push("/main");
        })
        .catch(() => {
          push("/main");
        });
    } else if (my?.relationList.length === 0) {
      push("/signup");
    } else {
      push("/main");
    }
  }, [my]);
}
