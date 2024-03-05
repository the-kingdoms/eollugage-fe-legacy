import StaffInform from "@/screen/manage/StaffInform";
import Schedule from "@/screen/manage/Schedule";
import TabBarGage from "@modules/components/bars/TabBarGage";
import LongTab from "@modules/components/tabs/LongTab";
import FlexBox from "@modules/layout/FlexBox";
import { useState, useEffect } from "react";
import FloatingActionButton from "@modules/components/button/FloatingActionButton";
import CeoBanner from "@/assist/CeoBanner";

export default function Manage() {
  const [selectTab, setSelectTab] = useState("left");
  const [authority, setAutority] = useState("staff");

  useEffect(() => {
    // 권한 가져오기
    setAutority("ceo"); // 임시 권한
  }, []);

  return (
    <FlexBox direction="col" className="h-full justify-between">
      <FlexBox direction="col" className="w-full h-full gap-4">
        <div className="B1-medium mt-1.5">직원 관리</div>
        <LongTab
          text={["근무 스케쥴", "직원 정보"]}
          pageHandle={Options => setSelectTab(Options)}
        />
        <div className="w-full px-4">
          {selectTab === "right" && authority === "ceo" && <CeoBanner />}
        </div>
        {selectTab === "left" ? <Schedule /> : <StaffInform />}
      </FlexBox>
      <div className="ml-auto my-6 mx-4">
        {selectTab === "left" && authority === "ceo" && (
          <FloatingActionButton text="근무 추가" />
        )}
        {selectTab === "right" && authority === "ceo" && (
          <FloatingActionButton text="직원 추가" />
        )}
      </div>
      <TabBarGage />
    </FlexBox>
  );
}
