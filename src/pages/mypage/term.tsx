import { termText } from "@/libs/settingText";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";

export default function Term() {
  return (
    <FlexBox direction="col" className="px-4 break-keep">
      <TopTitle type="back" title="개인정보 처리방침" />
      <div className="pt-8 pb-6 border-t border-Gray1">
        <div className="H5-bold mb-4">{termText.title}</div>
        <div className="text-Gray6 B4-regular !leading-5">
          {termText.description}
        </div>
        {termText.parts.map(part => (
          <FlexBox direction="col" className="items-start gap-2 mt-8">
            <div className="text-Gray7 B3-medium mb-2 !leading-5">
              {part.title}
            </div>
            <div className="text-Gray6 B4-regular !leading-5">
              {part.description}
            </div>
            {part.detail.map(detail => (
              <li className="text-Gray6 B4-regular !leading-[22px]">
                {detail}
              </li>
            ))}
          </FlexBox>
        ))}
      </div>
    </FlexBox>
  );
}
