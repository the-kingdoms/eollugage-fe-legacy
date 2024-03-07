import React from "react";
import FlexBox from "@modules/layout/FlexBox";
import Divider from "@modules/layout/Divider";
import {
  InviteSchedule,
  inviteScheduleAtom,
  selectedPositionAtom,
} from "@/data/inviteSchedule";
import { useAtom } from "jotai";

const ConfirmEmployee = () => {
  const [inviteSchedule] = useAtom(inviteScheduleAtom);
  const [selectedPosition] = useAtom(selectedPositionAtom);

  const makeRestMinutes = () => {
    let restMinutes;
    (Object.keys(inviteSchedule) as (keyof InviteSchedule)[]).forEach(day => {
      const scedule = inviteSchedule[day];
      if (scedule.restFrom === null || scedule.restUntil === null) return;

      const startHour = parseInt(scedule.restFrom.slice(0, 2));
      const startMinute = parseInt(scedule.restFrom.slice(3));
      const endHour = parseInt(scedule.restUntil.slice(0, 2));
      const endMinute = parseInt(scedule.restUntil.slice(3));

      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;
      const restTimeInMinutes = endTimeInMinutes - startTimeInMinutes;
      console.log(restTimeInMinutes);
      restMinutes = restTimeInMinutes;
    });

    return restMinutes;
  };

  const makeWorkScheduleEntries = () => {
    const workScheduleEntries: {
      day: string;
      workHours: string;
    }[] = [];

    (Object.keys(inviteSchedule) as (keyof InviteSchedule)[]).forEach(day => {
      const scedule = inviteSchedule[day];
      if (
        scedule.restFrom === null ||
        scedule.restUntil === null ||
        scedule.workFrom === null ||
        scedule.workUntil === null
      )
        return;
      const entry = {
        day,
        workHours: scedule.workFrom + " - " + scedule.workUntil,
      };
      workScheduleEntries.push(entry);
    });

    return workScheduleEntries;
  };

  const workScheduleEntries = makeWorkScheduleEntries();

  const restMinutes = makeRestMinutes();

  return (
    <FlexBox direction="col" className="w-full h-full">
      <div className="w-full mt-4">
        <div className="H4-bold">직원이 일하는</div>
        <div className="H4-bold">시간을 확인해주세요</div>
        <div className="B5-regular text-Gray4 mt-2">
          확인 후 이상이 없다면 직원 추가하기를 눌러주세요
        </div>
      </div>

      <div className="mt-8 w-full h-full">
        <div className="p-4 bg-white shadow rounded">
          <div className="B3-medium mb-4">직원 정보</div>
          <Divider />
          <FlexBox direction="row" className="w-full mt-4 justify-between">
            <div className="B4-medium text-Gray5">직책</div>

            <div className="B3-medium ml-4 text-Gray7">{selectedPosition}</div>
          </FlexBox>
          {workScheduleEntries.map(({ day, workHours }, index) => (
            <FlexBox
              key={index}
              direction="row"
              className="w-full mt-4 justify-between"
            >
              <div className="B4-medium text-Gray5">
                {index === 0 ? "근무요일 / 시간" : ""}
              </div>
              <div className="B3-medium ml-4 text-Gray7">{`${day} ${workHours}`}</div>
            </FlexBox>
          ))}
          <div className="flex justify-between mt-8">
            <div className="B4-medium text-Gray5">휴게 시간</div>
            <div className="B3-medium text-Gray7">{`${restMinutes}분`}</div>
          </div>
        </div>
      </div>
    </FlexBox>
  );
};

export default ConfirmEmployee;
