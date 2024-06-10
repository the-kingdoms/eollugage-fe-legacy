import { storeIdAtom } from "@/data/global";
import {
  InviteSchedule,
  inviteScheduleAtom,
  selectedPositionAtom,
} from "@/data/inviteSchedule";
import copy from "@/libs/copy";
import { createRandomString } from "@/libs/createRandomId";
import FlexBox from "@modules/layout/FlexBox";
import axios from "axios";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface InviteResponse {
  id: string;
  inviteData: InviteDataType;
}

interface InviteDataType {
  storeId: string;
  position: string;
  schedule: InviteSchedule;
  createdAt: string;
}

function ShareLink() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [inviteSchedule] = useAtom(inviteScheduleAtom);
  const [selectedPosition] = useAtom(selectedPositionAtom);
  const [storeId] = useAtom(storeIdAtom);

  const inviteId = createRandomString(8);
  const handleCopyLink = (id: string) => {
    const link = `${window.location.origin}/?id=${id}`;
    copy(
      link,
      () => {
        setLinkCopied(true);
      },
      err => {
        console.log("링크를 복사하는데 실패했습니다: ", err);
      },
    );
  };

  const sendInviteToDB = async (id: string) => {
    const inviteData: InviteDataType = {
      storeId,
      position: selectedPosition,
      schedule: inviteSchedule,
      createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    const data = {
      id,
      inviteData,
    };
    try {
      await axios.post("/api/dynamoDB", data);
      handleCopyLink(inviteId);
    } catch (error) {
      console.error("Failed to create invite:", error);
    }
  };

  useEffect(() => {
    sendInviteToDB(inviteId);
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
          <button onClick={() => handleCopyLink(inviteId)} type="button">
            <FlexBox direction="row">
              <div className="B4-regular text-Gray4 underline">링크 복사</div>
              <div className="B4-regular text-Gray4">하기</div>
            </FlexBox>
          </button>
        </FlexBox>
      </FlexBox>
      {linkCopied && (
        <div className="w-full B5-regular px-4 py-4 mb-4 bg-[#2D2D2D] text-white">
          <p className="mb-4">링크가 자동으로 복사되었습니다.</p>
        </div>
      )}
    </>
  );
}

export default ShareLink;
export type { InviteDataType };
