import NoticeField from "@/screen/main/NoticeField";
import FlexBox from "@modules/layout/FlexBox";
import { useState } from "react";
import { Notice } from "@/apis/notice";

export default function () {
  const [notice, setNotice] = useState<string>("");

  return (
    <FlexBox direction="col" className="w-full gap-4 items-start">
      <div className="H5-bold">관리자 공지</div>
      <NoticeField
        value={notice}
        setValue={setNotice}
        placeholder="눌러서 추가해보세요"
      />
    </FlexBox>
  );
}
