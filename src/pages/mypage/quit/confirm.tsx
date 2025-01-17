import { myAtom } from "@/data/global";
import { usePostDeleteAccount } from "@/hooks/query/deleteAccount";
import { quitText } from "@/libs/settingText";
import TextButton from "@modules/components/button/TextButton";
import Checkbox from "@modules/components/selections/Checkbox";
import useDialog from "@modules/hooks/useDialog";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

export default function QuitConfirm() {
  const [my] = useAtom(myAtom);
  const { openDialog } = useDialog();
  const router = useRouter();
  const { mutate: postDeleteAccountMutate } = usePostDeleteAccount();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onClickCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const onClickConfirmBtn = async () => {
    postDeleteAccountMutate();
    router.push("/mypage/quit/complete");
  };
  const onClickQuitBtn = () => {
    openDialog({
      title: "탈퇴하기",
      discription: "탈퇴하실 경우, 2-3일 뒤에 탈퇴메일이 발송됩니다.",
      type: "confirm",
      confirmText: "예, 탈퇴하겠습니다.",
      closeText: "아니오",
      onAction: onClickConfirmBtn,
    });
  };

  return (
    <FlexBox direction="col" className="gap-6 h-full pb-1 px-4">
      <TopTitle type="back" />
      <FlexBox direction="col" className="w-full h-full justify-between">
        <FlexBox direction="col" className="w-full items-start gap-10">
          <div className="text-Gray5 B1-medium !leading-[28px]">
            <span className="text-Black H5-bold">{my?.name} </span>님<br />
            탈퇴 전에 확인해주세요!
          </div>
          <FlexBox direction="col" className="w-full gap-6 pl-5 items-start">
            {quitText.map((text, i) => (
              <li
                className="list-disc text-Gray6 B4-medium break-keep !leading-[22px] list-outside indent-[-20px]"
                key={i}
              >
                {text.includes("2-3일")
                  ? text.split("2-3일").map((splitedString, index) => (
                      <span key={index}>
                        {index !== 0 && <span className="text-Red">2-3일</span>}
                        {splitedString}
                      </span>
                    ))
                  : text}
              </li>
            ))}
          </FlexBox>
        </FlexBox>
        <FlexBox direction="col" className="w-full gap-4">
          <FlexBox className="gap-2">
            <Checkbox
              checked={isChecked}
              onClick={onClickCheckBox}
              color="red"
              size="S"
              type="square"
            />
            <div
              className="text-Gray6 B4-regular"
              onClick={onClickCheckBox}
              role="presentation"
            >
              유의사항을 모두 확인하였으며 동의합니다
            </div>
          </FlexBox>
          <TextButton
            text="탈퇴하기"
            size="full"
            inactive={!isChecked}
            onClick={onClickQuitBtn}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
