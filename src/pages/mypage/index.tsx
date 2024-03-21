import AdminControlBanner from "@/assist/banner/AdminControlBanner";
import { myMemberIdAtom, roleAtom } from "@/data/global";
import RelationSlider from "@/screen/mypage/RelationSlider";
import UserInfo from "@/screen/mypage/UserInfo";
import WorkHistoryList from "@/screen/mypage/WorkHistoryList";
import WorkHour from "@/screen/mypage/WorkHour";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useGetRelationList } from "@/hooks/query/relation";
import { Relation } from "@/apis/relation";
import { History } from "@/apis/history";
import { useGetHistoryList } from "@/hooks/query/history";

export default function Manage() {
  const [memberId] = useAtom(myMemberIdAtom);
  const [role] = useAtom(roleAtom);
  const [currentRelation, setCurrentRelation] = useState<Relation[]>([]);
  const { relations } = useGetRelationList();
  const { histories } = useGetHistoryList(memberId);

  useEffect(() => {
    if (relations) {
      setCurrentRelation(relations ?? []);
    }
  }, [relations]);

  return (
    <FlexBox direction="col" className="relative h-full justify-between">
      <FlexBox direction="col" className="w-full gap-6 py-4">
        <UserInfo />
        <FlexBox direction="col" className="w-full gap-2">
          <WorkHour
            memberId={
              role === "STAFF" ? memberId : "" // currentRelation.member.id
            }
          />
          <div className="w-full px-4">
            {role === "OWNER" && <AdminControlBanner />}
          </div>
          <div className="w-full">
            {(role === "MANAGER" || role === "OWNER") && (
              <RelationSlider
                relationList={relations ?? []}
                currentRelation={currentRelation[0] ?? ""}
              />
            )}
          </div>
        </FlexBox>
        <WorkHistoryList
          memberId={
            role === "STAFF" ? memberId : "" // currentRelation.member.id
          }
        />
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
