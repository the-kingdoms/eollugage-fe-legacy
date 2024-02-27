import OwnerInput from "@/screen/mypage/OwnerInput";
import OwnerWelcome from "@/screen/mypage/OwnerWelcome";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import { useState } from "react";

type View = "owner_input" | "owner_welcome";

export default function Home() {
  const [storeName, setStoreName] = useState<string>("");
  const [currentView, setCurrentView] = useState<View>("owner_input");

  const handleNextClick = () => {
    if (currentView === "owner_input" && storeName.length > 0) {
      setCurrentView("owner_welcome"); // owner_welcome 페이지로 전환
    }
  };

  return (
    <FlexBox direction="col" className="w-full h-full px-4">
      <TopTitle title="" type="back" />
      {currentView === "owner_input" ? (
        <OwnerInput
          storeName={storeName}
          setStoreName={setStoreName}
          onNext={handleNextClick}
        />
      ) : (
        <OwnerWelcome />
      )}
    </FlexBox>
  );
}
