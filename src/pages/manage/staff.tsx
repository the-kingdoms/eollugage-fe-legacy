import { Plan } from "@/apis/plan";
import { useGetPlanList } from "@/hooks/query/plan";
import StaffTimeApproval from "@/screen/manage/StaffTimeApproval";
import StaffTimeInput from "@/screen/manage/StaffTimeInput";
import WeekButtons from "@/screen/manage/WeekButtons";
import Divider from "@modules/layout/Divider";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Staff() {
  const [activeDays, setActiveDays] = useState<string | string[]>("");
  const { plans } = useGetPlanList();
  const [planList, setPlanList] = useState<Plan[]>([]);

  useEffect(() => {
    console.log(plans);
    if (plans && plans.length > 0) {
      setPlanList(plans);
    } else {
      setPlanList([]);
    }
  }, [plans]);

  return (
    <div className="bg-Black">
      <TopTitle type="back" />
      <div className="pl-4">
        <div className="text-White H5-medium mt-4">얼루가</div>
        <FlexBox className="mt-1 mb-9 gap-2 text-White B4-regular">
          <span>알바</span>
          <span>010-1234-5678</span>
        </FlexBox>
      </div>
      <div className="rounded-t-2xl bg-White">
        <FlexBox direction="col" className="py-6 px-4 w-full gap-6">
          <WeekButtons activeDays={activeDays} setActiveDays={setActiveDays} />
          <StaffTimeInput
            title="근무시간"
            startTime={dayjs().format("HHmm")}
            setStartTime={() => {}}
            endTime={dayjs().format("HHmm")}
            setEndTime={() => {}}
          />
          <StaffTimeInput
            title="휴게시간"
            startTime={dayjs().format("HHmm")}
            setStartTime={() => {}}
            endTime={dayjs().format("HHmm")}
            setEndTime={() => {}}
          />
        </FlexBox>
        <Divider height={16} />
        <FlexBox direction="col" className="items-start pt-6">
          <div className="text-Gray6 B4-medium mb-4 px-4">출퇴근 기록</div>
          <StaffTimeApproval status="approve" />
          <Divider />
          <StaffTimeApproval status="disapprove" />
        </FlexBox>
      </div>
    </div>
  );
}
