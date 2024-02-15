import React, { useState } from "react";
import { useRouter } from "next/router";
import FlexBox from "@modules/layout/FlexBox";
import TextButton from "@modules/components/button/TextButton";
import TopTitle from "@modules/layout/TopTitle";
import Profile from "@modules/components/profile/Profile";

export default function Home() {
  const router = useRouter();

  return (
    <FlexBox direction="col" className="w-full h-full px-4">
      <TopTitle title="" type="back" />
      <FlexBox direction="col" className="w-full h-full space-y-12 px-4">
        <div className="w-full mt-4">
          <div className="H4-bold">얼루가 직원님,</div>
          <div className="H4-bold">환영합니다</div>
        </div>
        <FlexBox direction="col" className="space-y-4">
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
        onClick={() => router.push("/manage")}
      />
    </FlexBox>
  );
}
