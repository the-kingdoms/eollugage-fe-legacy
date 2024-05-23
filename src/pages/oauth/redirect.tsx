import { PostRelationBody } from "@/apis/relation";
import { myAtom } from "@/data/global";
import { useGetMy } from "@/hooks/query/my";
import { usePostPlanList } from "@/hooks/query/plan";
import { usePostRelation } from "@/hooks/query/relation";
import { InviteDataType } from "@/screen/manage/ShareLink";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
  const { query, push } = useRouter();
  const token = query?.token;
  const [my] = useAtom(myAtom);
  const { refetch } = useGetMy();
  const { mutate: postRelationMutate } = usePostRelation();
  const { mutate: postPlanListMutate } = usePostPlanList();

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token.toString());
      refetch();
    }
  }, [token]);

  async function getInviteData(inviteDataId: string) {
    const response = await axios.get<InviteDataType>(
      `/api/dynamoDB/?=${inviteDataId}`,
    );
    return response.data;
  }
  function createNewEmployee(inviteData: InviteDataType, memberId: string) {
    const body: PostRelationBody = {
      role: "STAFF",
      position: inviteData.position,
    };
    postRelationMutate(
      { storeId: inviteData.storeId, memberId: my?.id as string, body },
      {
        onSettled: () =>
          postPlanListMutate({
            storeId: inviteData.storeId,
            memberId,
            inviteSchedule: inviteData.schedule,
          }),
      },
    );
  }
  useEffect(() => {
    if (my?.id === undefined || my?.id === null) return;
    if (my?.relationList.length === 0) {
      push("/signup");
    } else if (localStorage.getItem("inviteDataId") !== null) {
      const inviteDataId: string = JSON.parse(
        localStorage.getItem("inviteDataId") as string,
      );
      getInviteData(inviteDataId)
        .then(inviteData => {
          createNewEmployee(inviteData, my?.id);
          localStorage.removeItem("inviteDataId");
          push("/main");
        })
        .catch(() => {
          push("/main");
        });
    } else {
      push("/main");
    }
  }, [my]);
}
