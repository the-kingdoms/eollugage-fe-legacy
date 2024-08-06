import { usePostStore } from "@/hooks/query/store";
import OwnerInput from "@/screen/signup/OwnerInput";
import OwnerWelcome from "@/screen/signup/OwnerWelcome";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import dayjs from "dayjs";
import { useState } from "react";

type View = "owner_input" | "owner_welcome";

export default function Home() {
  const { mutate: postStoreMutate } = usePostStore();
  const [storeName, setStoreName] = useState<string>("");
  const [currentView, setCurrentView] = useState<View>("owner_input");

  const handleNextClick = () => {
    const now = dayjs();
    // TODO: 추후 실제 데이터로 변경해야함
    postStoreMutate(
      {
        name: storeName,
        phone: "010-0000-0000",
        openingHour: `${now.toISOString()}`,
        introduction: `안녕하세요 ${storeName}입니다.`,
        address: "서울시 강남구",
        image: "https://via.placeholder.com/150",
        originalInfo: "기본정보",
        externalNotice: "외부공지",
        internalNotice: "내부공지",
      },
      { onSuccess: () => setCurrentView("owner_welcome") },
    );
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
        <OwnerWelcome storeName={storeName} />
      )}
    </FlexBox>
  );
}
