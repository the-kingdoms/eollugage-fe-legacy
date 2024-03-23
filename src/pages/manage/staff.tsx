import { myMemberIdAtom } from "@/data/global";
import { useGetHistoryList } from "@/hooks/query/history";
import { useGetPlanList } from "@/hooks/query/plan";
import StaffTimeApproval from "@/screen/manage/StaffTimeApproval";
import StaffTimeInput from "@/screen/manage/StaffTimeInput";
import WeekButtons from "@/screen/manage/WeekButtons";
import Divider from "@modules/layout/Divider";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import { useAtom } from "jotai";
import { DayInfo } from "@/screen/manage/WeekButtons";
import { useEffect, useState } from "react";
import { dayTypeConvert } from "@/data/inviteSchedule";
import { Plan } from "@/apis/plan";
import dayjs from "dayjs";
import { useGetRelationList } from "@/hooks/query/relation";
import { Relation } from "@/apis/relation";

export default function Staff() {
  const [activeDays, setActiveDays] = useState<string | string[]>("");
  const [myPlan, setMyPlan] = useState<Plan[]>([]);
  const [memberId] = useAtom(myMemberIdAtom);
  const { plans } = useGetPlanList(memberId);
  const { histories } = useGetHistoryList(memberId);
  const { relations } = useGetRelationList(memberId);
  const plansArray = plans || [];

  useEffect(() => {
    const daysArray = plansArray.map(plan =>
      getKorDay(dayTypeConvert, plan.day),
    );
    setActiveDays(daysArray);
  }, [plans]);

  const toggleDayPlan = (dayInfo: DayInfo) => {
    if (dayInfo.type === "inputed") {
      dayInfo.type = "workday";
      const clickDay = plansArray.filter(
        plan => getKorDay(dayTypeConvert, plan.day) === dayInfo.dayName,
      );
      setMyPlan(clickDay);
    } else if (dayInfo.type === "workday") {
      dayInfo.type = "inputed";
    }
    return dayInfo;
  };

  useEffect(() => {}, [myPlan]);

  function getKorDay(object: Record<string, string>, value: string) {
    return Object.keys(object).find(key => object[key] === value) || "";
  }

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
            startTime={
              myPlan?.[0]?.startTime.replace(/:/g, "") || dayjs().format("HHmm")
            }
            setStartTime={() => {}}
            endTime={
              myPlan[0]?.endTime.replace(/:/g, "") || dayjs().format("HHmm")
            }
            setEndTime={() => {}}
          />
          <StaffTimeInput
            title="휴게시간"
            startTime={
              myPlan[0]?.restStartTime.replace(/:/g, "") ||
              dayjs().format("HHmm")
            }
            setStartTime={() => {}}
            endTime={
              myPlan[0]?.restEndTime.replace(/:/g, "") || dayjs().format("HHmm")
            }
            setEndTime={() => {}}
          />
        </FlexBox>
        <Divider height={16} />
        <FlexBox direction="col" className="items-start pt-6">
          <div className="text-Gray6 B4-medium mb-4 px-4">출퇴근 기록</div>
          {histories &&
            histories.map(myhistory => (
              <>
                <StaffTimeApproval
                  starttime={myhistory.startTime}
                  endtime={myhistory.endTime}
                  date={myhistory.date}
                  status={myhistory.status.slice(0, -1).toLowerCase()}
                />
                <Divider />
              </>
            ))}
        </FlexBox>
      </div>
    </div>
  );
}
