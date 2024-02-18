import React, { useState } from "react";
import { useRouter } from "next/router";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import StaffWithStore from "@/screen/mypage/StaffWithStore";
import StaffWithoutStore from "@/screen/mypage/StaffWithoutStore";

type StaffViewState = "with_store" | "without_store";

export default function Home() {
  const [viewState, setViewState] = useState<StaffViewState>("with_store");
  const router = useRouter();

  const handleManageClick = () => router.push("/manage");

  return (
    <FlexBox direction="col" className="w-full h-full px-4">
      <TopTitle title="" type="back" />
      {viewState === "with_store" ? (
        <StaffWithStore onManageClick={handleManageClick} />
      ) : (
        <StaffWithoutStore />
      )}
    </FlexBox>
  );
}
