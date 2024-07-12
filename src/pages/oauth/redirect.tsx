import { PostRelationBody } from "@/apis/relation";
import { myAtom } from "@/data/global";
import { useGetInviteData } from "@/hooks/query/dynamodb";
import { useStaffJoin } from "@/hooks/query/relation";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
  const router = useRouter();

  const [my] = useAtom(myAtom);

  const { data: inviteResponse, isSuccess } = useGetInviteData();
  const { mutate: staffJoinMutate } = useStaffJoin();

  useEffect(() => {
    const inviteId = localStorage.getItem("inviteDataId");
    if (inviteId !== null) {
      // 1. 직원초대링크를 통해 들어온 새 직원
      if (isSuccess && inviteResponse) {
        const body: PostRelationBody = {
          role: "STAFF",
          position: inviteResponse.inviteData.position,
        };
        const inviteRequestBody = {
          storeId: inviteResponse.inviteData.storeId,
          memberId: my?.id as string,
          body,
          inviteSchedule: inviteResponse.inviteData.schedule,
        };
        staffJoinMutate(inviteRequestBody);
      }
    } else if (my?.relationList.length === 0) {
      // 2. 회원가입
      router.push("/signup");
    } else {
      // 3. 기존회원 로그인
      router.push("/main");
    }
  }, [isSuccess]);
}
