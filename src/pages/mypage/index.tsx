import { Relation } from "@/apis/relation";
import AdminControlBanner from "@/assist/banner/AdminControlBanner";
import { myMemberIdAtom, roleAtom } from "@/data/global";
import { useGetRelationList } from "@/hooks/query/relation";
import RelationSlider from "@/screen/mypage/RelationSlider";
import SettingFAB from "@/screen/mypage/SettingFAB";
import UserInfo from "@/screen/mypage/UserInfo";
import WorkHistoryList from "@/screen/mypage/WorkHistoryList";
import WorkHour from "@/screen/mypage/WorkHour";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Manage() {
  const [memberId] = useAtom(myMemberIdAtom);
  const [role] = useAtom(roleAtom);
  const [currentMemberId, setCurrentMemberId] = useState<string>("");
  const { data: relations } = useGetRelationList();

  useEffect(() => {
    if (role !== "STAFF") {
      if (relations) {
        const firstMemberId = relations[0]?.member.id;
        if (!currentMemberId) {
          setCurrentMemberId(firstMemberId);
        }
      }
    } else {
      setCurrentMemberId(memberId);
    }
  }, [relations]);

  const handleRelationSelect = (selectedRelation: Relation) => {
    setCurrentMemberId(selectedRelation.member.id);
  };

  return (
    <FlexBox direction="col" className="relative h-full justify-between w-full">
      <FlexBox direction="col" className="w-full gap-6 py-4">
        <UserInfo />
        <FlexBox direction="col" className="w-full gap-2">
          <WorkHour memberId={currentMemberId} />
          <div className="w-full px-4">
            {role === "OWNER" && <AdminControlBanner />}
          </div>
          <div className="w-full">
            {(role === "MANAGER" || role === "OWNER") && (
              <RelationSlider
                relationList={relations ?? []}
                currentMemberId={currentMemberId}
                onClick={handleRelationSelect}
              />
            )}
          </div>
        </FlexBox>
        <WorkHistoryList memberId={currentMemberId} />
      </FlexBox>
      <TabBarGage />
      <SettingFAB />
    </FlexBox>
  );
}
