import React from "react";
import FlexBox from "@modules/layout/FlexBox";
import Divider from "@modules/layout/Divider";
import { inviteScheduleAtom } from "@/data/inviteSchedule";
import { useAtom } from "jotai";

const ConfirmEmployee = () => {
  const [inviteSchedule, setInviteSchedule] = useAtom(inviteScheduleAtom);

  return (
    <FlexBox direction="col" className="w-full h-full px-4">
      <div className="w-full mt-4">
        <div className="H4-bold">직원이 일하는</div>
        <div className="H4-bold">시간을 확인해주세요</div>
        <div className="B5-regular text-gray-400 mt-2">
          확인 후 이상이 없다면 직원 추가하기를 눌러주세요
        </div>
      </div>

      <div className="mt-8 w-full h-full">
        <div className="p-4 bg-white shadow rounded">
          <div className="B3-medium mb-4">직원 정보</div>
          <Divider />
          <FlexBox direction="row" className="w-full mt-4 justify-between">
            <div className="B4-medium text-gray-500">직책</div>
            <div className="B3-medium ml-4">알바</div>
          </FlexBox>
          <FlexBox direction="row" className="w-full mt-4 justify-between">
            <div className="B4-medium text-gray-500">근무요일 / 시간</div>
            <div className="B3-medium">월 11:30 - 12:30</div>
          </FlexBox>
          <FlexBox direction="row" className="h-hull w-full justify-between">
            <div></div>
            <div className="B3-medium ml-4">수 11:30 - 12:30</div>
          </FlexBox>
          <FlexBox direction="row" className="h-hull w-full justify-between">
            <div></div>
            <div className="B3-medium ml-4">금 11:30 - 12:30</div>
          </FlexBox>
          <div className="flex justify-between mt-8">
            <div className="B4-medium text-gray-500">휴게 시간</div>
            <div className="B3-medium">30분</div>
          </div>
        </div>
      </div>
    </FlexBox>
  );
};

export default ConfirmEmployee;
