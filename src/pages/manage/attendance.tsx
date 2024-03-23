import { AllHistory } from "@/apis/history";
import ProfileDiscription from "@/assist/ProfileDiscription";
import StateButtonWrapper from "@/assist/StateButtonWrapper";
import TimeBanner from "@/assist/banner/TimeBanner";
import {
  useGetAllMemeberHistory,
  usePostHistoryStatus,
} from "@/hooks/query/history";
import ButtonBar from "@modules/components/bars/ButtonBar";
import TextButton from "@modules/components/button/TextButton";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Attendance() {
  const { data: historyList } = useGetAllMemeberHistory();
  const { mutate: postHistoryStatusMutate } = usePostHistoryStatus();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isInactive, setIsInactive] = useState(false);

  // 임시, 일자별 query 가능한 새 api 가 나오면 수정 필요
  const [filteredList, setFilteredList] = useState<AllHistory[]>([]);
  useEffect(() => {
    const tempList = historyList?.filter(historyInfo => {
      return historyInfo.date === selectedDate.format("YYYY-MM-DD");
    });
    setFilteredList(tempList ?? []);
  }, [historyList, selectedDate]);

  useEffect(() => {
    setIsInactive(() => true);
    filteredList.forEach(history => {
      if (history.status === "DISAPPROVED") {
        setIsInactive(() => false);
      }
    });
  }, [filteredList]);

  const allButtonClick = () => {
    filteredList.forEach(history => {
      if (history.status === "DISAPPROVED") {
        postHistoryStatusMutate({
          memberId: history.relation.member.id,
          historyId: history.id,
          status: "APPROVED",
        });
      }
    });
  };

  const profileClick = (index: number) => {
    const history = filteredList[index];
    postHistoryStatusMutate({
      memberId: history.relation.member.id,
      historyId: history.id,
      status: history.status === "DECLINED" ? "APPROVED" : "DECLINED",
    });
  };

  const DayMove = (direction: string) => {
    const newDate =
      direction === "left"
        ? selectedDate.subtract(1, "day")
        : selectedDate.add(1, "day");
    setSelectedDate(newDate);
  };

  return (
    <FlexBox direction="col" className="w-full h-full justify-between">
      <FlexBox direction="col" className="w-full px-2">
        <TopTitle title="출퇴근 관리" />
        <TimeBanner dayDate={selectedDate} DayClick={DayMove} />
        <FlexBox direction="col" className="gap-6 w-full px-2">
          {filteredList.map((history, index) => (
            <StateButtonWrapper
              key={index}
              buttonClick={() => profileClick(index)}
              buttonState={history.status}
            >
              <ProfileDiscription
                key={index}
                name={history.relation.member.name}
                position={history.relation.position}
                time={`${history.startTime} ~ ${history.endTime}`}
              />
            </StateButtonWrapper>
          ))}
        </FlexBox>
      </FlexBox>
      <ButtonBar
        button={
          <TextButton
            size="full"
            text="일괄 승인"
            onClick={allButtonClick}
            inactive={isInactive}
          />
        }
      />
    </FlexBox>
  );
}
