import { useGetHistoryList } from "@/hooks/query/history";
import { historyToWorkHistory } from "@/libs/historyToWorkHistory";
import WorkInfoCard from "@modules/components/card/WorkInfoCard";
import FlexBox from "@modules/layout/FlexBox";
import dayjs, { Dayjs } from "dayjs";
import router, { useRouter } from "next/router";
import React, { useEffect, useState, memo } from "react";

interface WorkHistoryListProps {
  memberId: string;
}

interface WorkHistory {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  workingDays: number;
  workingMinutes: number;
  overtimeMinutes: number;
}

export default function WorkHistoryList({ memberId }: WorkHistoryListProps) {
  const { push } = useRouter();
  const { data: historys, refetch } = useGetHistoryList(memberId);
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([]);

  useEffect(() => {
    if (historys) {
      const newWorkHistoryList: WorkHistory[] = historyToWorkHistory(historys);
      setWorkHistoryList(newWorkHistoryList);
    }
  }, [historys]);

  const makePathQuery = (startDate: Dayjs, endDate: Dayjs) => {
    return `memberId=${memberId}&startDate=${startDate.format("YYYY-MM-DD")}&endDate=${endDate.format("YYYY-MM-DD")}`;
  };

  const handleDetailClick = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) => {
    const filteredHistorys = historys?.filter(history => {
      const historyDate = dayjs(history.date);

      const isSameOrAfterStartDate =
        historyDate.isSame(startDate) || historyDate.isAfter(startDate);
      const isSameOrBeforeEndDate =
        historyDate.isSame(endDate) || historyDate.isBefore(endDate);

      return isSameOrAfterStartDate && isSameOrBeforeEndDate;
    });

    localStorage.setItem(
      "selectedWorkHistory",
      JSON.stringify(filteredHistorys),
    );

    push(`/mypage/detail`);
  };

  return (
    <FlexBox direction="col" className="w-full px-4 gap-4">
      <div className="w-full justify-start B3-medium">근무 일지</div>
      <FlexBox direction="col" className="w-full gap-5">
        {workHistoryList.reverse().map((workHistory, index) => (
          <WorkInfoCard
            key={index}
            startDate={workHistory.startDate}
            endDate={workHistory.endDate}
            workingDays={workHistory.workingDays}
            workingMinutes={workHistory.workingMinutes}
            overtimeMinutes={workHistory.overtimeMinutes}
            onClick={() => {
              push(
                `/mypage/detail?${makePathQuery(workHistory.startDate, workHistory.endDate)}`,
              );
            }}
          />
        ))}
      </FlexBox>
    </FlexBox>
  );
}
