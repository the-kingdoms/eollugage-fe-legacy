import AdminControlBanner from "@/assist/banner/AdminControlBanner";
import { roleAtom } from "@/data/global";
import { useGetRelation } from "@/hooks/query/relation";
import RelationSlider from "@/screen/mypage/RelationSlider";
import UserInfo from "@/screen/mypage/UserInfo";
import WorkHistoryList from "@/screen/mypage/WorkHistoryList";
import WorkHour from "@/screen/mypage/WorkHour";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Relation } from "@/apis/relation";

export default function Manage() {
  const [role] = useAtom(roleAtom);
  const [currentRelation, setCurrentRelation] = useState<Relation>(
    {} as Relation,
  );
  const { relations } = useGetRelation();

  useEffect(() => {
    if (relations) setCurrentRelation(relations[0] ?? {});
  }, [relations]);

  return (
    <FlexBox direction="col" className="relative h-full justify-between">
      <FlexBox direction="col" className="w-full gap-6 py-4">
        <UserInfo />
        <FlexBox direction="col" className="w-full gap-2">
          <WorkHour />
          <div className="w-full px-4">
            {role === "OWNER" && <AdminControlBanner />}
          </div>
          <div className="w-full">
            {(role === "MANAGER" || role === "OWNER") && (
              <RelationSlider
                relationList={relations ?? []}
                currentRelation={currentRelation}
              />
            )}
          </div>
        </FlexBox>
        <WorkHistoryList />
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
