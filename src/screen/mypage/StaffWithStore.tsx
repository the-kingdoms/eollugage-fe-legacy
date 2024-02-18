import React from "react";
import FlexBox from "@modules/layout/FlexBox";
import Profile from "@modules/components/profile/Profile";
import TextButton from "@modules/components/button/TextButton";

const StaffWithStore = ({ onManageClick }) => {
  return (
    <FlexBox direction="col" className="w-full h-full justify-between px-4">
      <FlexBox direction="col" className="w-full h-full">
        <div className="w-full mt-4">
          <div className="H4-bold">얼루가 직원님,</div>
          <div className="H4-bold">환영합니다</div>
        </div>
        <FlexBox direction="col" className="space-y-4 mt-16">
          <Profile name="얼" size="L" />
          <FlexBox direction="col" className="items-center">
            <div className="H5-bold">피자헛 홍대점</div>
            <div className="B3-medium text-Gray4">얼루가게 사장님</div>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <TextButton
        size="L"
        text="나의 근무 스케줄 보러 가기"
        className="mb-4"
        onClick={onManageClick}
      />
    </FlexBox>
  );
};

export default StaffWithStore;
