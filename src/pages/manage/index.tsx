import StaffInform from "@/screen/manage/StaffInform";
import Schedule from "@/screen/manage/Schedule";
import TabBarGage from "@modules/components/bars/TabBarGage";
import LongTab from "@modules/components/tabs/LongTab";
import FlexBox from "@modules/layout/FlexBox";
import { useState, useEffect } from "react";
import Attendance from "@/screen/manage/Attendance";
import ShortTab from "@modules/components/tabs/ShortTab";

export default function Manage() {
  const [StaffTab, setStaffTab] = useState("left");
  const [authority, setAutority] = useState("staff");
  const [CeoTab, setCeoTab] = useState("left");

  useEffect(() => {
    // 권한 가져오기
    setAutority("ceo"); // 임시 권한
  }, []);

  return (
    <FlexBox direction="col" className="h-full justify-between">
      <FlexBox direction="col" className="w-full gap-4">
        <div className="B1-medium mt-1.5">직원 관리</div>
        {authority === "staff" ? (
          <LongTab
            text={["근무 스케쥴", "직원 정보"]}
            pageHandle={Options => setStaffTab(Options)}
          />
        ) : (
          <ShortTab
            text={["근무 스케줄", "직원 정보", "출퇴근 관리"]}
            pageHandle={Options => setCeoTab(Options)}
          />
        )}
        {authority === "staff" &&
          (StaffTab === "left" ? <Schedule /> : <StaffInform />)}
        {authority === "ceo" &&
          (CeoTab === "left" ? (
            <Schedule />
          ) : CeoTab === "center" ? (
            <StaffInform />
          ) : (
            <Attendance />
          ))}
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
