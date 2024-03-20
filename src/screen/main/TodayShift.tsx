import { myAtom, myMemberIdAtom } from "@/data/global";
import { useGetAllMemeberHistory } from "@/hooks/query/history";
import { getTimeString } from "@/libs/timeValidation";
import WorkInfo from "@/screen/main/WorkInfo";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function TodayShift() {
  const [my] = useAtom(myAtom);
  const [myMemberId] = useAtom(myMemberIdAtom);
  const { data: historyList } = useGetAllMemeberHistory();

  // 임시
  const [filteredList, setFilteredList] = useState(historyList);
  useEffect(() => {
    const tempList = historyList?.filter(historyInfo => {
      return historyInfo.date === dayjs().format("YYYY-MM-DD");
    });
    setFilteredList(tempList);
  }, [historyList]);

  return (
    <FlexBox direction="col" className="w-full gap-4 items-start">
      <div className="H5-bold">금일의 근무</div>
      {filteredList?.map(historyInfo => (
        <WorkInfo
          key={historyInfo.id}
          name={historyInfo.relation.member.name}
          position={historyInfo.relation.position}
          time={getTimeString(historyInfo.startTime, historyInfo.endTime)}
        />
      ))}
    </FlexBox>
  );
}
