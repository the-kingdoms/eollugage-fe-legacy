import { getHistoryList } from "@/apis/history";
import { myMemberIdAtom, storeIdAtom } from "@/data/global";
import WorkInfoBanner from "@modules/components/banner/WorkInfoBanner";
import FlexBox from "@modules/layout/FlexBox";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function WorkHour() {
  const [workingMinutes, setWorkingMinutes] = useState(0);
  const [storeId] = useAtom(storeIdAtom);
  const [memberId] = useAtom(myMemberIdAtom);
  const { data: history } = useQuery({
    queryKey: ["history"],
    queryFn: () => getHistoryList(storeId, memberId),
  });
  const currentDate = dayjs().format("MM/DD");
  useEffect(() => {
    if (history) {
      let newWorkingMinutes = 0;
      history.forEach(item => {
        const startDate = dayjs(`${item.date}T${item.startTime}`);
        const endDate = dayjs(`${item.date}T${item.endTime}`);
        const diffMinutes = endDate.diff(startDate, "minute");
        newWorkingMinutes += diffMinutes;
      });
      setWorkingMinutes(newWorkingMinutes);
    }
  }, [history]);

  return (
    <>
      <FlexBox className="w-full justify-between mt-6">
        <WorkInfoBanner
          direction="left"
          size="L"
          type="regular"
          workingMinutes={workingMinutes}
        />
      </FlexBox>
      <FlexBox className="w-full justify-end B4-medium text-Gray5 pr-4 mt-2">
        {currentDate} 기준
      </FlexBox>
    </>
  );
}
