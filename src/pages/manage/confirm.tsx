import React, { useState } from "react";
import { useRouter } from "next/router";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import TextButton from "@modules/components/button/TextButton";
import ConfirmEmployee from "@/screen/manage/ConfirmEmployee";
import ShareLink from "@/screen/manage/ShareLink";

type View = "confirm" | "share";

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("confirm");
  const router = useRouter();

  const handleButtonClick = () => {
    setCurrentView("share"); // Change the view to "share" when button is clicked
  };

  const handleShiftButton = () => {
    router.push("/manage");
  };

  return (
    <FlexBox direction="col" className="w-full h-full px-4">
      <TopTitle title="" type="back" />
      {currentView === "confirm" ? <ConfirmEmployee /> : <ShareLink />}

      <div className="w-full mb-4">
        {currentView === "confirm" ? (
          <TextButton
            className="w-full"
            onClick={handleButtonClick}
            size="full"
            text="직원 추가하기"
          />
        ) : (
          <TextButton
            className="w-full"
            onClick={handleShiftButton}
            size="full"
            text="근무시간표 보러가기"
          />
        )}
      </div>
    </FlexBox>
  );
}
