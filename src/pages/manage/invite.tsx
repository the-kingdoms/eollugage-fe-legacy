import React, { useState } from "react";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import Dropdown from "@modules/components/selections/Dropdown";
import DayChip from "@modules/components/chips/DayChip";
import TimeField from "@modules/components/textfields/TimeField";
import TextButton from "@modules/components/button/TextButton";
import { inviteScheduleAtom } from "@/data/inviteSchedule";
import { useAtom } from "jotai";

type View = "inital_set" | "manage_time";
const positions = ["알바", "매니저", "점장"];

type Mode = "workday" | "inputing" | "inputed" | "inactive";

interface DayType {
  mon: Mode;
  tue: Mode;
  wen: Mode;
  thu: Mode;
  fri: Mode;
  sat: Mode;
  sun: Mode;
}

export default function Invite() {
  const [currentView, setCurrentView] = useState<View>("inital_set");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [inviteSchedule, setInviteSchedule] = useAtom(inviteScheduleAtom);

  const [dayType, setDayType] = useState<DayType>({
    mon: "inactive",
    tue: "inactive",
    wen: "inactive",
    thu: "inactive",
    fri: "inactive",
    sat: "inactive",
    sun: "inactive",
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
    const newSchedule = inviteSchedule;

    Object.keys(dayType).forEach(day => {
      if (dayType[day] === "workday") {
        newSchedule[day] = { workFrom, workUntil, restFrom, restUntil };
      }
    });

    setInviteSchedule(newSchedule); // 갱신된 스케줄로 상태 업데이트
    console.log(newSchedule);
  };

  const handleNextClick = () => {
    if (currentView === "inital_set") {
      setCurrentView("manage_time"); // manage_time 뷰로 전환
    }
  };

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
          defaultValue="직책을 선택해주세요"
          options={positions}
          onChange={value => setSelectedPosition(value)}
        />
      </div>

      <div className="w-full h-full mt-8">
        <div className="B3-medium text-gray-600">근무 요일</div>
        <FlexBox direction="row" className="w-full mt-2 justify-between">
          <DayChip
            day="월"
            type={dayType.mon}
            onChipClick={() => onChipClick("mon")}
          />
          <DayChip
            day="화"
            type={dayType.tue}
            onChipClick={() => onChipClick("tue")}
          />
          <DayChip
            day="수"
            type={dayType.wen}
            onChipClick={() => onChipClick("wen")}
          />
          <DayChip
            day="목"
            type={dayType.thu}
            onChipClick={() => onChipClick("thu")}
          />
          <DayChip
            day="금"
            type={dayType.fri}
            onChipClick={() => onChipClick("fri")}
          />
          <DayChip
            day="토"
            type={dayType.sat}
            onChipClick={() => onChipClick("sat")}
          />
          <DayChip
            day="일"
            type={dayType.sun}
            onChipClick={() => onChipClick("sun")}
          />
        </FlexBox>
        {currentView === "manage_time" ? (
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
        ) : (
          <div></div>
        )}
      </div>

      <FlexBox direction="row" className="w-full mb-8 justify-between">
        <TextButton size="M" text="직원 추가하기" />
        <TextButton size="M" text="시간 저장하기" onClick={handleSaveTime} />
      </FlexBox>
    </FlexBox>
  );
}
