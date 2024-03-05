import React, { Dispatch, SetStateAction } from "react";
import FlexBox from "@modules/layout/FlexBox";
import TextButton from "@modules/components/button/TextButton";
import TextField from "@modules/components/textfields/TextField";

interface OwnerInputProps {
  storeName: string;
  setStoreName: Dispatch<SetStateAction<string>>;
  onNext: () => void; // 다음 뷰로 움직이게 하는 함수
}

export default function OwnerInput({
  storeName,
  setStoreName,
  onNext,
}: OwnerInputProps) {
  return (
    <FlexBox direction="col" className="w-full h-full items-start">
      <FlexBox direction="col" className="w-full h-full space-y-16 items-start">
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
        onClick={onNext}
        inactive={storeName.length === 0}
      />
    </FlexBox>
  );
}
