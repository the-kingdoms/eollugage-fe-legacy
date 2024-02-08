import StaffInform from "@/screen/manage/StaffInform";
import Schedule from "@/screen/manage/schedule";
import TabBarGage from "@modules/components/bars/TabBarGage";
import LongTab from "@modules/components/tabs/LongTab";
import FlexBox from "@modules/layout/FlexBox";
import { useState } from "react";

export default function Manage() {
  const [selectedTab, setSelectedTab] = useState("left");

  return (
    <FlexBox direction="col" className="h-full justify-between">
      <FlexBox direction="col" className="w-full gap-4">
        <div className="B1-medium mt-1.5">직원 관리</div>
        <LongTab
          text={["근무 스케쥴", "직원 정보"]}
          pageHandle={Options => setSelectedTab(Options)}
        />
        {selectedTab === "left" ? <Schedule /> : <StaffInform />}
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
