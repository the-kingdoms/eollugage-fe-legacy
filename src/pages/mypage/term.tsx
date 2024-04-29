import { termText } from "@/libs/settingText";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";

export default function Term() {
  return (
    <FlexBox direction="col" className="break-keep">
      <div className="px-4 w-full">
        <TopTitle type="back" title="개인정보 처리방침" />
      </div>
      <div className="h-[1px] w-full bg-Gray1" />
      <div className="pt-8 pb-6 px-4">
        <div className="H5-bold mb-4">{termText.title}</div>
        <div className="text-Gray6 B4-regular !leading-5">
          {termText.description}
        </div>
        {termText.parts.map((part, i) => (
          <FlexBox key={i} direction="col" className="items-start gap-2 mt-8">
            <div className="text-Gray7 B3-medium mb-2 !leading-5">
              {part.title}
            </div>
            <div className="text-Gray6 B4-regular !leading-5">
              {part.description}
            </div>
            {part.detail.map((detail, index) => (
              <li
                className="text-Gray6 B4-regular !leading-[22px] indent-[-20px] pl-5"
                key={index}
              >
                {detail}
              </li>
            ))}
          </FlexBox>
        ))}
      </div>
    </FlexBox>
  );
}
