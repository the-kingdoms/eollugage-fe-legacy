import { storeIdAtom } from "@/data/global";
import {
  InviteSchedule,
  inviteScheduleAtom,
  selectedPositionAtom,
} from "@/data/inviteSchedule";
import copy from "@/libs/copy";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";

interface InviteDataType {
  storeId: string;
  position: string;
  schedule: InviteSchedule;
}

function ShareLink() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [inviteSchedule] = useAtom(inviteScheduleAtom);
  const [selectedPosition] = useAtom(selectedPositionAtom);
  const [storeId] = useAtom(storeIdAtom);

  function filterSchedule(inviteData: InviteDataType): InviteDataType {
    const filteredSchedule: InviteSchedule = Object.entries(
      inviteData.schedule,
    ).reduce((acc, [day, schedule]) => {
      if (schedule.workFrom !== null) {
        acc[day as keyof InviteSchedule] = schedule;
      }
      return acc;
    }, {} as InviteSchedule);

    return {
      ...inviteData,
      schedule: filteredSchedule,
    };
  }

  const createQueryString = () => {
    const inviteData: InviteDataType = {
      storeId,
      position: selectedPosition,
      schedule: inviteSchedule,
    };

    const inviteDataString = encodeURIComponent(
      JSON.stringify(filterSchedule(inviteData)),
    );
    return `/?inviteData=${inviteDataString}`;
  };

  const handleCopyLink = () => {
    const link = window.location.origin + createQueryString();
    copy(
      link,
      () => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      },
      err => {
        console.log("링크를 복사하는데 실패했습니다: ", err);
      },
    );
  };

  useEffect(() => {
    handleCopyLink();
  }, []);

  return (
    <>
      <FlexBox direction="col" className="w-full h-full px-4">
        <div className="w-full mt-4">
          <div className="H4-bold">링크를 직원에게</div>
          <div className="H4-bold">공유해주세요</div>
        </div>
        <FlexBox direction="col" className="w-full h-full mt-8">
          <div className="relative w-[170px] h-[170px]">
            <Image
              height={170}
              width={170}
              alt="link"
              src="/image/link.svg"
              className=""
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[#CC9F00] mix-blend-color" />
          </div>
          <div className="B1-medium text-Gray5 mt-4">
            링크복사가 안되었나요?
          </div>
          <button onClick={handleCopyLink} type="button">
            <div className="B2-regular text-Gray4">링크 복사하기</div>
          </button>
        </FlexBox>
      </FlexBox>
      {linkCopied && (
        <div className="w-full px-4 py-2 mb-4 bg-[#2D2D2D] text-white">
          링크가 자동으로 복사되었습니다.
        </div>
      )}
    </>
  );
}

export default ShareLink;
export type { InviteDataType };
