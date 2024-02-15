import React, { useState } from "react";
import { useRouter } from "next/router";
import FlexBox from "@modules/layout/FlexBox";
import TextButton from "@modules/components/button/TextButton";
import TopTitle from "@modules/layout/TopTitle";
import TextField from "@modules/components/textfields/TextField";
import Profile from "@modules/components/profile/Profile";

type View = "owner" | "owner_02";

export default function Home() {
  const [storeName, setStoreName] = useState<string>("");
  const [currentView, setCurrentView] = useState<View>("owner");
  const router = useRouter();

  const handleNextClick = () => {
    if (currentView === "owner" && storeName.length > 0) {
      setCurrentView("owner_02"); // Change to owner_02 page
    }
  };

  return (
    <FlexBox direction="col" className="w-full h-full px-4">
      <TopTitle title="" type="back" />
      {currentView === "owner" ? (
        // Owner_01 view
        <FlexBox direction="col" className="w-full h-full items-start px-4">
          <FlexBox
            direction="col"
            className="w-full h-full space-y-16 items-start"
          >
            <div className="mt-4">
              <div className="H4-bold">가게 이름을</div>
              <div className="H4-bold">입력해주세요</div>
            </div>
            <TextField
              value={storeName}
              setValue={setStoreName}
              placeholder="얼루가게 서울점"
            />
          </FlexBox>
          <TextButton
            size="L"
            text="다음"
            className="mb-4"
            onClick={handleNextClick}
            inactive={storeName.length === 0}
          />
        </FlexBox>
      ) : (
        // Owner_02 view
        <FlexBox direction="col" className="w-full h-full justify-between px-4">
          <FlexBox direction="col" className="w-full h-full">
            <div className="w-full mt-4">
              <div className="H4-bold">얼루가 사장님,</div>
              <div className="H4-bold">환영합니다</div>
            </div>
            <FlexBox direction="col" className="space-y-4 mt-16">
              <Profile name="얼" size="L" />
              <FlexBox direction="col" className="items-center">
                <div className="H5-bold">얼루가 가게점</div>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <TextButton
            size="L"
            text="직원 추가하러 가기"
            className="mb-4"
            onClick={() => router.push("/manage")}
          />
        </FlexBox>
      )}
    </FlexBox>
  );
}
