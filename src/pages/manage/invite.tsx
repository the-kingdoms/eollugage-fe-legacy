import React, { useState, useEffect } from "react";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import Dropdown from "@modules/components/selections/Dropdown";
import DayChip from "@modules/components/chips/DayChip";
import TimeField from "@modules/components/textfields/TimeField";
import TextButton from "@modules/components/button/TextButton";
import {
  inviteScheduleAtom,
  selectedPositionAtom,
} from "@/data/inviteSchedule";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

type View = "inital_set" | "manage_time";
const positions = ["알바", "매니저", "점장"];

type Mode = "workday" | "inputing" | "inputed" | "inactive";

interface DayType {
  월: Mode;
  화: Mode;
  수: Mode;
  목: Mode;
  금: Mode;
  토: Mode;
  일: Mode;
}

export default function Invite() {
  const [currentView, setCurrentView] = useState<View>("inital_set");
  const [selectedPosition, setSelectedPosition] = useAtom(selectedPositionAtom);
  const [inviteSchedule, setInviteSchedule] = useAtom(inviteScheduleAtom);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const router = useRouter();

  const [dayType, setDayType] = useState<DayType>({
    월: "inactive",
    화: "inactive",
    수: "inactive",
    목: "inactive",
    금: "inactive",
    토: "inactive",
    일: "inactive",
  });

  const [workFrom, setWorkFrom] = useState("0000");
  const [workUntil, setWorkUntil] = useState("0000");

  const [restFrom, setRestFrom] = useState("0000");
  const [restUntil, setRestUntil] = useState("0000");

  const onChipClick = (day: keyof DayType) => {
    setDayType(prev => {
      const newDayType = { ...prev };
      newDayType[day] = prev[day] === "workday" ? "inactive" : "workday";

      const hasWorkday = Object.values(newDayType).includes("workday");
      if (selectedPosition && hasWorkday) {
        setCurrentView("manage_time");
      }
      return newDayType;
    });
  };

  const handleSaveTime = () => {
    const newSchedule = { ...inviteSchedule };

    (Object.keys(dayType) as (keyof DayType)[]).forEach(day => {
      if (dayType[day] === "workday") {
        newSchedule[day] = {
          workFrom: `${workFrom.slice(0, 2)}:${workFrom.slice(2)}`,
          workUntil: `${workUntil.slice(0, 2)}:${workUntil.slice(2)}`,
          restFrom: `${restFrom.slice(0, 2)}:${restFrom.slice(2)}`,
          restUntil: `${restUntil.slice(0, 2)}:${restUntil.slice(2)}`,
        };
        setDayType(prev => {
          const newDayType = { ...prev };
          newDayType[day] = "inputed";
          return newDayType;
        });
      }
    });

    setInviteSchedule(newSchedule); // 갱신된 스케줄로 상태 업데이트

    setCurrentView("inital_set");

    setWorkFrom("0000");
    setWorkUntil("0000");
    setRestFrom("0000");
    setRestUntil("0000");

    setIsButtonActive(false);
  };

  const handleAddEmployee = () => {
    if (isButtonActive) {
      router.push("/manage/confirm");
    }
  };

  useEffect(() => {
    // 스케줄이 초기값인지 아닌지를 체크해주는 함수
    const isAnyScheduleChanged = Object.values(inviteSchedule).some(
      schedule => {
        return (
          schedule.workFrom !== null ||
          schedule.workUntil !== null ||
          schedule.restFrom !== null ||
          schedule.restUntil !== null
        );
      },
    );

    setIsButtonActive(isAnyScheduleChanged);
  }, [inviteSchedule]);

  return (
    <FlexBox direction="col" className="w-full h-full px-4">
      <TopTitle title="" type="back" />
      <div className="w-full mt-4">
        <div className="H4-bold">새로 들어오는</div>
        <div className="H4-bold">직원의 근무 요일을</div>
        <div className="H4-bold">설정해주세요</div>
        <div className="B5-regular text-gray-400 mt-4">
          근무/휴식 시간이 중복되는 요일을 한 번에 선택해서 시간을 입력해보세요
        </div>
      </div>
      <div className="mt-8 w-full">
        <Dropdown
          defaultValue="직책을 먼저 선택해주세요"
          options={positions}
          onChange={value => setSelectedPosition(value)}
        />
      </div>

      <div className="w-full h-full mt-8">
        <div className="B3-medium text-gray-600">근무 요일</div>
        <FlexBox direction="row" className="w-full mt-2 justify-between">
          <DayChip
            day="월"
            type={dayType.월}
            onChipClick={() => onChipClick("월")}
          />
          <DayChip
            day="화"
            type={dayType.화}
            onChipClick={() => onChipClick("화")}
          />
          <DayChip
            day="수"
            type={dayType.수}
            onChipClick={() => onChipClick("수")}
          />
          <DayChip
            day="목"
            type={dayType.목}
            onChipClick={() => onChipClick("목")}
          />
          <DayChip
            day="금"
            type={dayType.금}
            onChipClick={() => onChipClick("금")}
          />
          <DayChip
            day="토"
            type={dayType.토}
            onChipClick={() => onChipClick("토")}
          />
          <DayChip
            day="일"
            type={dayType.일}
            onChipClick={() => onChipClick("일")}
          />
        </FlexBox>
        {currentView === "manage_time" && (
          <div className="w-full mt-12">
            <div className="B4-medium text-gray-500">근무 시간</div>
            <FlexBox direction="row" className="w-full mt-4 justify-between">
              <TimeField value={workFrom} setValue={setWorkFrom} />
              <div>-</div>
              <TimeField value={workUntil} setValue={setWorkUntil} />
            </FlexBox>
            <div className="B4-medium text-gray-500 mt-8">휴게 시간</div>
            <FlexBox direction="row" className="w-full mt-4 justify-between">
              <TimeField value={restFrom} setValue={setRestFrom} />
              <div>-</div>
              <TimeField value={restUntil} setValue={setRestUntil} />
            </FlexBox>
          </div>
        )}
      </div>

      <FlexBox direction="row" className="w-full gap-4 mb-8 justify-between">
        <TextButton
          size="full"
          text="직원 추가하기"
          onClick={handleAddEmployee}
          inactive={!isButtonActive}
          type={isButtonActive ? "filled" : "outline"}
        />
        <TextButton size="full" text="시간 저장하기" onClick={handleSaveTime} />
      </FlexBox>
    </FlexBox>
  );
}
