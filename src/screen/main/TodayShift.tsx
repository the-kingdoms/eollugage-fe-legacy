import FlexBox from "@modules/layout/FlexBox";
import WorkInfo from "@/screen/main/WorkInfo";

export default function () {
  return (
    <FlexBox direction="col" className="w-full gap-4 items-start">
      <div className="H5-bold">금일의 근무</div>
      <WorkInfo name="김민수" position="팀장" time="09:00 ~ 18:00" />
      <WorkInfo name="이민지" position="팀원" time="09:00 ~ 18:00" />
    </FlexBox>
  );
}
