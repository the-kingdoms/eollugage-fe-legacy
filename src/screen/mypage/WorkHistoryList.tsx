import { filteredHistoryAtom } from "@/data/historyAtom";
import { useGetHistoryList } from "@/hooks/query/history";
import { historyToWorkHistory } from "@/libs/historyToWorkHistory";
import WorkInfoCard from "@modules/components/card/WorkInfoCard";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface WorkHistoryListProps {
  memberId: string | null;
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
  const { data: historys } = useGetHistoryList(memberId);
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistory[]>([]);
  const [, setFilteredHistory] = useAtom(filteredHistoryAtom);

  useEffect(() => {
    if (historys) {
      const newWorkHistoryList: WorkHistory[] = historyToWorkHistory(historys);
      setWorkHistoryList(newWorkHistoryList);
    }
  }, [historys]);

  const handleDetailClick = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) => {
    if (!historys) return;
    const filteredHistorys = historys.filter(history => {
      const historyDate = dayjs(history.date);

      const isSameOrAfterStartDate =
        historyDate.isSame(startDate) || historyDate.isAfter(startDate);
      const isSameOrBeforeEndDate =
        historyDate.isSame(endDate) || historyDate.isBefore(endDate);

      return isSameOrAfterStartDate && isSameOrBeforeEndDate;
    });
    setFilteredHistory(filteredHistorys);
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
            onClick={() =>
              handleDetailClick(workHistory.startDate, workHistory.endDate)
            }
          />
        ))}
      </FlexBox>
    </FlexBox>
  );
}
