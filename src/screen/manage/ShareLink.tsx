import React, { useState } from "react";
import FlexBox from "@modules/layout/FlexBox";
import Image from "next/image";

const ShareLink = () => {
  const [linkCopied, setLinkCopied] = useState(false);
  const handleCopyLink = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000); // 2초뒤에 메세지창 숨김
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
