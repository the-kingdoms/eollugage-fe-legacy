import { Plan } from "@/apis/plan";
import { myMemberIdAtom } from "@/data/global";
import { dayTypeConvert } from "@/data/inviteSchedule";
import { useGetHistoryList } from "@/hooks/query/history";
import { useGetPlanList } from "@/hooks/query/plan";
import { useGetRelation } from "@/hooks/query/relation";
import StaffTimeApproval from "@/screen/manage/StaffTimeApproval";
import StaffTimeInput from "@/screen/manage/StaffTimeInput";
import WeekButtons, { DayInfo } from "@/screen/manage/WeekButtons";
import Divider from "@modules/layout/Divider";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Staff() {
  const [activeDays, setActiveDays] = useState<string | string[]>("");
  const [myPlan, setMyPlan] = useState<Plan[]>([]);
  const [memberId] = useAtom(myMemberIdAtom);
  const { data: plans } = useGetPlanList(memberId);
  const { data: histories } = useGetHistoryList(memberId);
  const { data: relations } = useGetRelation(memberId);

  function getKorDay(object: Record<string, string>, value: string) {
    return Object.keys(object).find(key => object[key] === value) || "";
  }

  useEffect(() => {
    const daysArray = (plans ?? []).map(plan =>
      getKorDay(dayTypeConvert, plan.day),
    );
    setActiveDays(daysArray);
  }, [plans]);

  const toggleDayPlan = (dayInfo: DayInfo) => {
    const newDayInfo = dayInfo;
    if (newDayInfo.type === "inputed") {
      newDayInfo.type = "workday";
      const clickDay = (plans ?? []).filter(
        plan => getKorDay(dayTypeConvert, plan.day) === dayInfo.dayName,
      );
      setMyPlan(clickDay);
    } else if (newDayInfo.type === "workday") {
      newDayInfo.type = "inputed";
    }
    return newDayInfo;
  };

  return (
    <div className="bg-Black">
      <TopTitle type="back" />
      <div className="pl-4">
        <div className="text-White H5-medium mt-4">
          {relations && relations.member.name}
        </div>
        <FlexBox className="mt-1 mb-9 gap-2 text-White B4-regular">
          <span>{relations && relations.position}</span>
          <span>{relations && relations.member.phone}</span>
        </FlexBox>
      </div>
      <div className="rounded-t-2xl bg-White">
        <FlexBox direction="col" className="py-6 px-4 w-full gap-6">
          <WeekButtons
            activeDays={activeDays}
            setActiveDays={setActiveDays}
            dayChipClick={toggleDayPlan}
            multiselect={false}
          />
          <StaffTimeInput
            title="근무시간"
            startTime={myPlan[0]?.startTime.replace(/:/g, "") || "0000"}
            setStartTime={() => {}}
            endTime={myPlan[0]?.endTime.replace(/:/g, "") || "0000"}
            setEndTime={() => {}}
          />
          <StaffTimeInput
            title="휴게시간"
            startTime={myPlan[0]?.restStartTime.replace(/:/g, "") || "0000"}
            setStartTime={() => {}}
            endTime={myPlan[0]?.restEndTime.replace(/:/g, "") || "0000"}
            setEndTime={() => {}}
          />
        </FlexBox>
        <Divider height={16} />
        <FlexBox direction="col" className="items-start pt-6">
          <div className="text-Gray6 B4-medium mb-4 px-4">출퇴근 기록</div>
          {histories &&
            histories.map(
              myhistory =>
                myhistory.status !== "DECLINED" && (
                  <>
                    <StaffTimeApproval
                      starttime={myhistory.startTime}
                      endtime={myhistory.endTime}
                      date={myhistory.date}
                      status={myhistory.status}
                    />
                    <Divider />
                  </>
                ),
            )}
        </FlexBox>
      </div>
    </div>
  );
}
