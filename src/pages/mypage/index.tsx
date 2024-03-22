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

export default function Manage() {
  const [memberId] = useAtom(myMemberIdAtom);
  const [role] = useAtom(roleAtom);
  const [currentRelation, setCurrentRelation] = useState<Relation>();
  const [currentMemberId, setCurrentMemberId] = useState<string>("");
  const { relations, isLoading } = useGetRelationList();

  useEffect(() => {
    if (!isLoading && relations) {
      if (role !== "STAFF") {
        const firstMemberId = relations[0]?.member.id;
        if (!currentMemberId) {
          setCurrentMemberId(firstMemberId);
          setCurrentRelation(relations[0]);
        }
      } else {
        setCurrentMemberId(memberId);
      }
    }
  }, [relations, isLoading]);

  const handleRelationSelect = (selectedRelation: Relation) => {
    setCurrentRelation(selectedRelation);
    setCurrentMemberId(selectedRelation.member.id);
  };

  return (
    <FlexBox direction="col" className="relative h-full justify-between">
      <FlexBox direction="col" className="w-full gap-6 py-4">
        <UserInfo />
        <FlexBox direction="col" className="w-full gap-2">
          <WorkHour memberId={currentMemberId} />
          <div className="w-full px-4">
            {role === "OWNER" && <AdminControlBanner />}
          </div>
          ``
          <div className="w-full">
            {(role === "MANAGER" || role === "OWNER") && (
              <RelationSlider
                relationList={relations ?? []}
                currentRelation={currentRelation}
                onClick={handleRelationSelect}
              />
            )}
          </div>
        </FlexBox>
        <WorkHistoryList memberId={currentMemberId} />
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
