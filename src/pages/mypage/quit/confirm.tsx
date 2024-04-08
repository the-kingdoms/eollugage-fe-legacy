import { myAtom } from "@/data/global";
import { quitText } from "@/libs/settingText";
import TextButton from "@modules/components/button/TextButton";
import Checkbox from "@modules/components/selections/Checkbox";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import { useAtom } from "jotai";
import { useState } from "react";

export default function QuitConfirm() {
  const [my] = useAtom(myAtom);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const onClickCheckBox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <FlexBox direction="col" className="gap-6 h-full pb-1">
      <TopTitle type="back" />
      <FlexBox direction="col" className="w-full h-full px-4 justify-between">
        <FlexBox direction="col" className="w-full items-start gap-10">
          <div className="text-Gray5 B1-medium">
            <span className="text-Black H5-bold">{my?.name} </span>님<br />
            탈퇴 전에 확인해주세요!
          </div>
          <FlexBox direction="col" className="w-full gap-6">
            {quitText.map(text => (
              <li className="list-disc text-Gray4 B4-medium break-keep">
                {text}
              </li>
            ))}
          </FlexBox>
        </FlexBox>
        <FlexBox direction="col" className="w-full gap-4">
          <FlexBox className="gap-2">
            <Checkbox checked={isChecked} onClick={onClickCheckBox} />
            <div className="text-Gray6 B4-regular">
              유의사항을 모두 확인하였으며 동의합니다
            </div>
          </FlexBox>
          <TextButton text="탈퇴하기" size="full" inactive={!isChecked} />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
