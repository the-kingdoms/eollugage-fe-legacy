import { AllHistory } from "@/apis/history";
import ProfileDiscription from "@/assist/ProfileDiscription";
import StateButtonWrapper from "@/assist/buttonwrapper/StateButtonWrapper";
import TimeBanner from "@/assist/banner/TimeBanner";
import {
  useGetAllMemberHistoryByDate,
  usePostHistoryStatus,
} from "@/hooks/query/history";
import ButtonBar from "@modules/components/bars/ButtonBar";
import TextButton from "@modules/components/button/TextButton";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isInactive, setIsInactive] = useState(false);
  const { data } = useGetAllMemberHistoryByDate(
    selectedDate.format("YYYY-MM-DD"),
  );
  const { mutate: postHistoryStatusMutate } = usePostHistoryStatus();

  const [historyList, setHistoryList] = useState<AllHistory[]>([]);

  useEffect(() => {
    setHistoryList(data ?? []);
  }, [data]);

  useEffect(() => {
    setIsInactive(() => true);
    historyList.forEach(history => {
      if (history.status === "DISAPPROVED") {
        setIsInactive(() => false);
      }
    });
  }, [historyList]);

  const allButtonClick = () => {
    historyList.forEach(history => {
      if (history.status === "DISAPPROVED" && history.relation.member.id) {
        postHistoryStatusMutate({
          memberId: history.relation.member.id,
          historyId: history.id,
          status: "APPROVED",
        });
      }
    });
    setHistoryList(prev => {
      return prev.map(history => {
        return {
          ...history,
          status: "APPROVED",
        };
      });
    });
  };

  const profileClick = (index: number) => {
    const history = historyList[index];
    if (!history.relation.member.id) return;
    postHistoryStatusMutate({
      memberId: history.relation.member.id,
      historyId: history.id,
      status: history.status === "DECLINED" ? "APPROVED" : "DECLINED",
    });
    setHistoryList(prev => {
      return prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            status: item.status === "DECLINED" ? "APPROVED" : "DECLINED",
          };
        }
        return item;
      });
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
          {historyList.map((history, index) => (
            <StateButtonWrapper
              key={index}
              buttonClick={() => profileClick(index)}
              buttonState={history.status}
            >
              <ProfileDiscription
                key={index}
                name={history.relation.member.name}
                position={history.relation.position}
                phone="010-0000-0000" // 나중에 수정
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
