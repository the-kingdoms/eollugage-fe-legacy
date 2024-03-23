import WorkDetailCard from "@modules/components/card/WorkDetailCard";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface WorkHistoryDetail {
  date: string;
  type: "regular" | "extra";
  startTime: string;
  endTime: string;
  totalWorkHours: number;
}

export default function MyPageDetail() {
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistoryDetail[]>(
    [],
  );

  useEffect(() => {
    const storedHistory = localStorage.getItem("selectedWorkHistory");
    if (storedHistory) {
      const historyItems = JSON.parse(storedHistory);
      const processedItems = historyItems.map((item: WorkHistoryDetail) => ({
        type: "regular",
        date: item.date,
        startTime: item.startTime.slice(0, -3), // 마지막 초 단위 삭제
        endTime: item.endTime.slice(0, -3),
      }));
      setWorkHistoryList(processedItems);
      console.log(workHistoryList);
    }
  }, []);

  return (
    <FlexBox direction="col" className="px-4 w-full gap-4">
      <TopTitle title="상세 보기" />
      <FlexBox className="w-full gap-4 justify-end">
        <FlexBox className="gap-1">
          <div className="rounded border-2 border-Black w-3 h-4" />
          <div className="text-Gray6 B5-medium">정규근무</div>
        </FlexBox>
        <FlexBox className="gap-1">
          <div className="rounded border-2 border-Black w-3 h-4 bg-Black" />
          <div className="text-Gray6 B5-medium">연장근무</div>
        </FlexBox>
      </FlexBox>
      <FlexBox direction="col" className="w-full gap-2">
        {workHistoryList.map((item, index) => (
          <WorkDetailCard
            key={index}
            type={"regular"}
            date={dayjs(item.date).format("YYYY-MM-DD")}
            startTime={item.startTime}
            endTime={item.endTime}
          />
        ))}
      </FlexBox>
    </FlexBox>
  );
}
