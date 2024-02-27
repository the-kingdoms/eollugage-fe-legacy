import React, { useState } from "react";
import TabBarGage from "@modules/components/bars/TabBarGage";
import FlexBox from "@modules/layout/FlexBox";
import TextField from "@modules/components/textfields/TextField";
import TextCheckField from "@modules/components/textfields/TextCheckField";

export default function Home() {
  const [boardContent, setboardContent] =
    useState<string>("항목을 추가해주세요");

  return (
    <FlexBox direction="col" className="min-h-full justify-between">
      <FlexBox direction="col" className="w-full py-4">
        <div className="mt-4">
          <div className="H4-bold">관리자 공지</div>
        </div>

        <div className="mt-4">
          <div className="H4-bold">금일의 근무</div>
        </div>

        <div className="mt-4">
          <FlexBox direction="row">
            <div className="H4-bold">발주 보드</div>
          </FlexBox>
          <TextCheckField value={boardContent} setValue={setboardContent} />
          <TextCheckField value={boardContent} setValue={setboardContent} />
          <TextCheckField value={boardContent} setValue={setboardContent} />
        </div>
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
