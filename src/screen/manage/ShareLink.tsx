import { storeIdAtom } from "@/data/global";
import {
  InviteSchedule,
  inviteScheduleAtom,
  scheduleInit,
  selectedPositionAtom,
} from "@/data/inviteSchedule";
import FlexBox from "@modules/layout/FlexBox";
import axios from "axios";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createRandomString } from "@/libs/createRandomId";
import copy from "@/libs/copy";

interface InviteDataType {
  storeId: string;
  position: string;
  schedule: InviteSchedule;
}

const inviteScheduleInit: InviteSchedule = {
  월: { ...scheduleInit },
  화: { ...scheduleInit },
  수: { ...scheduleInit },
  목: { ...scheduleInit },
  금: { ...scheduleInit },
  토: { ...scheduleInit },
  일: { ...scheduleInit },
};

function ShareLink() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [inviteSchedule] = useAtom(inviteScheduleAtom);
  const [selectedPosition] = useAtom(selectedPositionAtom);
  const [storeId] = useAtom(storeIdAtom);

  const currentInviteId = createRandomString(8);

  useEffect(() => {
    sendInviteToDB();
  }, []);

  const sendInviteToDB = async () => {
    const inviteData: InviteDataType = {
      storeId,
      position: selectedPosition,
      schedule: inviteSchedule,
    };
    console.log(currentInviteId);
    const data = {
      id: currentInviteId,
      inviteData,
    };
    try {
      await axios.post("/api/dynamoDB", data);
      handleCopyLink();
    } catch (error) {
      console.error("Failed to create invite:", error);
    }
  };

  const handleCopyLink = () => {
    const link = window.location.origin + "/?=" + currentInviteId;
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
