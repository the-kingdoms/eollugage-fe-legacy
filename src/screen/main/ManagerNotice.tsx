import {
  useGetNotice,
  usePostNotice,
  usePutNotice,
} from "@/hooks/query/notice";
import NoticeField from "@/screen/main/NoticeField";
import FlexBox from "@modules/layout/FlexBox";
import { useEffect, useState } from "react";

export default function ManagerNotice() {
  const { data: notices } = useGetNotice();
  const { mutate: postNoticeMutate } = usePostNotice();
  const { mutate: putNoticeMutate } = usePutNotice();
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setNotice(notices?.[0]?.content ?? "");
  }, [notices]);

  const update = () => {
    if (notices && notices?.length > 0) {
      putNoticeMutate({ noticeId: notices[0].id, body: { content: notice } });
    } else {
      postNoticeMutate({ content: notice });
    }
  };

  return (
    <FlexBox direction="col" className="w-full gap-4 items-start">
      <div className="H5-bold">관리자 공지</div>
      <NoticeField
        value={notice}
        setValue={setNotice}
        onBlur={update}
        placeholder="눌러서 추가해보세요"
      />
    </FlexBox>
  );
}
