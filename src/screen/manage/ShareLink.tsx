import { storeIdAtom } from "@/data/global";
import {
  inviteScheduleAtom,
  selectedPositionAtom,
} from "@/data/inviteSchedule";
import { usePostInviteData } from "@/hooks/query/dynamodb";
import { copyLink } from "@/libs/copy";
import { createRandomString } from "@/libs/createRandomId";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";

function ShareLink() {
  const [inviteId, setInviteId] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [showToastMsg, setShowToastMsg] = useState<boolean>(false);
  const [inviteSchedule] = useAtom(inviteScheduleAtom);
  const [selectedPosition] = useAtom(selectedPositionAtom);
  const [storeId] = useAtom(storeIdAtom);

  const { mutate, isSuccess } = usePostInviteData(inviteId);

  if (!inviteId) setInviteId(createRandomString(8));

  const handleCopyLink = () => {
    copyLink(inviteId, () => setLinkCopied(true));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isSuccess || linkCopied) {
      setShowToastMsg(true);
      timer = setTimeout(() => {
        setShowToastMsg(false);
      }, 2000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSuccess, linkCopied]);

  useEffect(() => {
    if (inviteId.length > 0) {
      const inviteData = {
        id: inviteId,
        inviteData: {
          storeId,
          position: selectedPosition,
          schedule: inviteSchedule,
          createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
      };
      mutate(inviteData);
    }
  }, [inviteId]);

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
            <FlexBox direction="row">
              <div className="B4-regular text-Gray4 underline">링크 복사</div>
              <div className="B4-regular text-Gray4">하기</div>
            </FlexBox>
          </button>
        </FlexBox>
      </FlexBox>
      {showToastMsg && (
        <div className="w-full B5-regular px-4 py-4 mb-4 bg-[#2D2D2D] text-white">
          <p className="mb-4">링크가 자동으로 복사되었습니다.</p>
        </div>
      )}
    </>
  );
}

export default ShareLink;
