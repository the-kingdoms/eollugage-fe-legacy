import React, { useState } from "react";
import { useRouter } from "next/router";
import FlexBox from "@modules/layout/FlexBox";
import TextButton from "@modules/components/button/TextButton";
import TopTitle from "@modules/layout/TopTitle";
import TextField from "@modules/components/textfields/TextField";

export default function Home() {
  const [storeName, setStoreName] = useState<string>("");
  const router = useRouter();

  return (
    <FlexBox direction="col" className="w-full h-full px-4">
      <TopTitle title="" type="back" />
      <FlexBox
        direction="col"
        className="w-full h-full space-y-16 items-start px-4"
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
        onClick={() => router.push("/owner")}
        inactive={storeName.length === 0}
      />
    </FlexBox>
  );
}
