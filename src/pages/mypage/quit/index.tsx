import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import { useAtom } from "jotai";
import { myAtom } from "@/data/global";
import TextAreaField from "@modules/components/textfields/TextAreaField";
import TextButton from "@modules/components/button/TextButton";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Quit() {
  const [my] = useAtom(myAtom);
  const textAreaPlaceholder =
    "불편하신 점을 적어주신다면 저희가 적극 개선하도록 할게요.\n얼루가게가 생각나시면 언제든 다시 찾아와주세요!";

  const [text, setText] = useState<string>("");
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const router = useRouter();
  const onClickCompleteBtn = () => {
    setText("");
    router.push({
      pathname: "/mypage/consult",
      query: {
        from: "quit",
      },
    });
  };

  return (
    <FlexBox direction="col" className="h-full gap-6">
      <TopTitle type="back" />
      <FlexBox
        direction="col"
        className="px-4 w-full h-full justify-between pb-1"
      >
        <div className="text-Gray5 B1-medium w-full">
          <span className="text-Black H5-bold">{my?.name} </span>님<br />
          떠나시는 이유를 알려주세요.
        </div>
        <textarea
          className="border-2 border-Gray2 w-full rounded-2xl p-4 placeholder:text-Gray5 text-Black B5-medium h-2/5 resize-none"
          placeholder={textAreaPlaceholder}
          value={text}
          onChange={onChangeText}
        />
        <FlexBox direction="col" className="gap-2.5 w-full">
          <button
            className="underline underline-offset-4 text-Gray5 B5-regular"
            onClick={onClickCompleteBtn}
          >
            그냥 넘어가고 싶어요!
          </button>
          <TextButton
            size="full"
            text="작성완료"
            onClick={onClickCompleteBtn}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
