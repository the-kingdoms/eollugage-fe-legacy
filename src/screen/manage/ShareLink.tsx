import React, { useState, useEffect } from "react";
import FlexBox from "@modules/layout/FlexBox";
import Image from "next/image";
import {
  inviteScheduleAtom,
  selectedPositionAtom,
} from "@/data/inviteSchedule";
import { useAtom } from "jotai";
import { storeIdAtom } from "@/data/global";
import { InviteSchedule } from "@/data/inviteSchedule";

interface InviteDataType {
  storeId: string;
  position: string;
  schedule: InviteSchedule;
}

const ShareLink = () => {
  const [linkCopied, setLinkCopied] = useState(false);
  const [inviteSchedule] = useAtom(inviteScheduleAtom);
  const [selectedPosition] = useAtom(selectedPositionAtom);
  const [storeId] = useAtom(storeIdAtom);

  useEffect(() => {
    const link = window.location.origin + createQueryString();
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch(err => {
        console.log("링크를 복사하는데 실패했습니다: ", err);
      });
  }, []);

  const handleCopyLink = () => {
    const link = window.location.origin + createQueryString();
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch(err => {
        console.error("링크를 복사하는데 실패했습니다: ", err);
      });
  };

  const createQueryString = () => {
    const inviteData: InviteDataType = {
      storeId: storeId,
      position: selectedPosition,
      schedule: inviteSchedule,
    };
    const inviteDataString = encodeURIComponent(JSON.stringify(inviteData));

    // 인코딩된 문자열을 스트링 형태로 결합
    let queryString = `/?inviteData=${inviteDataString}`;
    //let queryString = `/?storeId=${storeIdString}&position=${positionString}&schedule=${scheduleString}`;
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
export type { InviteDataType };
