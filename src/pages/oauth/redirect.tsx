import { myAtom } from "@/data/global";
import { useGetMy } from "@/hooks/query/my";
import { usePostRelation } from "@/hooks/query/relation";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { InviteDataType } from "@/screen/manage/ShareLink";
import { PostRelationBody } from "@/apis/relation";

export default function Redirect() {
  const { query, push } = useRouter();
  const token = query?.token;
  const [my] = useAtom(myAtom);
  const { refetch } = useGetMy();
  const { postRelationMutate, isSuccess } = usePostRelation();

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token.toString());
      refetch();
    } else {
      //push("/main"); // 일단은 main(직원용)으로 이동
    }
  }, [token]);

  useEffect(() => {
    if (
      my?.id !== undefined &&
      typeof typeof localStorage.getItem("inviteData") !== null
    ) {
      const inviteData: InviteDataType = JSON.parse(
        localStorage.getItem("inviteData") as string,
      );
      console.log(inviteData);
      const body: PostRelationBody = {
        role: "STAFF",
        position: inviteData.position,
      };
      postRelationMutate(inviteData.storeId, my?.id as string, body);
    }
  }, [my?.id]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess === true) {
    }
  }, [isSuccess]);

  useEffect(() => {
    if (my !== null) {
      //if (my.relationList.length > 0) push("/main");
      //else push("/signup");
    }
  }, [my]);
}
