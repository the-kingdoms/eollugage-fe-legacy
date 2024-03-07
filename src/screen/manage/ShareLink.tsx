import React, { useState } from "react";
import FlexBox from "@modules/layout/FlexBox";
import Image from "next/image";
import {
  InviteSchedule,
  inviteScheduleAtom,
  selectedPositionAtom,
} from "@/data/inviteSchedule";
import { useAtom } from "jotai";

const ShareLink = () => {
  const [linkCopied, setLinkCopied] = useState(false);
  const [inviteSchedule] = useAtom(inviteScheduleAtom);
  const [selectedPosition] = useAtom(selectedPositionAtom);

  const handleCopyLink = () => {
    const link = window.location.origin + createQueryString();
    console.log(link);

    navigator.clipboard
      .writeText(link)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch(err => {
        console.error("Failed to copy the link: ", err);
      });
  };

  const createQueryString = () => {
    const positionString = encodeURIComponent(JSON.stringify(selectedPosition));
    const scheduleString = encodeURIComponent(JSON.stringify(inviteSchedule));

    // 인코딩된 문자열을 쿼리 스트링 형태로 결합
    let queryString = `/?position=${positionString}&schedule=${scheduleString}`;
    return queryString;
  };

  return (
    <FlexBox direction="col" className="w-full h-full px-4">
      <div className="w-full mt-4">
        <div className="H4-bold">링크를 직원에게</div>
        <div className="H4-bold">공유해주세요</div>
      </div>
      <FlexBox direction="col" className="w-full h-full mt-8">
        <Image height={170} width={170} alt="link" src="/image/goldLink.png" />
        <div className="B1-medium text-Gray5 mt-4">링크복사가 안되었나요?</div>
        <div
          className="B2-regular text-Gray4"
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={handleCopyLink}
        >
          링크 복사하기
        </div>
      </FlexBox>
      {linkCopied && (
        <div className="w-full px-4 py-2 mb-4 bg-[#2D2D2D] text-white">
          링크가 자동으로 복사되었습니다.
        </div>
      )}
    </FlexBox>
  );
};

export default ShareLink;
