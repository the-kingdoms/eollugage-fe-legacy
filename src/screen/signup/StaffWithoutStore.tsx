import React from "react";
import FlexBox from "@modules/layout/FlexBox";
import Image from "next/image";

export default function StaffWithoutStore() {
  return (
    <FlexBox direction="col" className="w-full h-full space-y-16 px-4">
      <div className="w-full mt-4">
        <div className="H4-bold">얼루가님,</div>
        <div className="H4-bold">소속된 가게가 없어요</div>
      </div>
      <FlexBox direction="col" className="space-y-4">
        <Image height={170} width={170} alt="link" src="/image/link.svg" />
        <div className="B2-medium text-Gray4">
          사장님께 초대를 요청해볼까요?
        </div>
      </FlexBox>
    </FlexBox>
  );
}
