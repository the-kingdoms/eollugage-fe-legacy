import { useGetHistoryList } from "@/hooks/query/history";
import WorkInfoCard from "@modules/components/card/WorkInfoCard";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import router, { useRouter } from "next/router";
import React, { useEffect, useState, memo } from "react";
import { historyToWorkHistory } from "@/libs/historyToWorkHistory";

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

const WorkHistoryList = memo(({ memberId }: WorkHistoryListProps) => {
  const { push } = useRouter();
  const { data: historys, isLoading } = useGetHistoryList(memberId);
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([]);

  useEffect(() => {
    if (!isLoading && historys) {
      const newWorkHistoryList: WorkHistory[] = historyToWorkHistory(historys);
      setWorkHistoryList(newWorkHistoryList);
    }
  }, [historys, isLoading]);

  const reversedWorkHistoryList = [...workHistoryList].reverse(); // 최신날짜기준으로 랜더링되도록 넣어놨습니다

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
        {reversedWorkHistoryList.map((workHistory, index) => (
          <WorkInfoCard
            key={index}
            startDate={workHistory.startDate}
            endDate={workHistory.endDate}
            workingDays={workHistory.workingDays}
            workingMinutes={workHistory.workingMinutes}
            overtimeMinutes={workHistory.overtimeMinutes}
            onClick={() =>
              handleDetailClick(workHistory.startDate, workHistory.endDate)
            }
          />
        ))}
      </FlexBox>
    </FlexBox>
  );
});

export default WorkHistoryList;
