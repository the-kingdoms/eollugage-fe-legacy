import { termText } from "@/libs/settingText";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";

export default function Term() {
  return (
    <>
      <TopTitle type="back" title="개인정보 처리방침" />
      <div className="px-4 mt-8 pb-6">
        <div className="H5-bold mb-4">{termText.title}</div>
        <div className="text-Gray6 B4-regular">{termText.description}</div>
        {termText.parts.map(part => (
          <FlexBox direction="col" className="items-start gap-2 mt-8">
            <div className="text-Gray7 B3-medium mb-2">{part.title}</div>
            <div className="text-Gray6 B4-regular">{part.description}</div>
            {part.detail.map(detail => (
              <li className="text-Gray6 B4-regular">{detail}</li>
            ))}
          </FlexBox>
        ))}
      </div>
    </>
  );
}
