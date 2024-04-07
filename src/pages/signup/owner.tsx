import { usePostStore } from "@/hooks/query/store";
import OwnerInput from "@/screen/signup/OwnerInput";
import OwnerWelcome from "@/screen/signup/OwnerWelcome";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import { useState } from "react";

type View = "owner_input" | "owner_welcome";

export default function Home() {
  const { mutate: postStoreMutate } = usePostStore();
  const [storeName, setStoreName] = useState<string>("");
  const [currentView, setCurrentView] = useState<View>("owner_input");

  const handleNextClick = () => {
    postStoreMutate(
      { name: storeName },
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
