import WorkDetailCard from "@/screen/mypage/WorkDetailCard";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";

export default function MyPageDetail() {
  return (
    <>
      <TopTitle title="상세 보기" />
      <FlexBox className="mt-2.5 gap-4 justify-end mb-6">
        <FlexBox className="gap-1">
          <div className="rounded border-2 border-Black w-3 h-4" />
          <div className="text-Gray6 B5-medium">정규근무</div>
        </FlexBox>
        <FlexBox className="gap-1">
          <div className="rounded border-2 border-Black w-3 h-4 bg-Black" />
          <div className="text-Gray6 B5-medium">연장근무</div>
        </FlexBox>
      </FlexBox>
      <FlexBox direction="col" className="px-4 gap-2">
        <WorkDetailCard
          type="regular"
          date="2023-12-13"
          startTime="2023-12-13 15:00:00"
          endTime="2023-12-13 18:00:00"
        />
        <WorkDetailCard
          type="extra"
          date="2023-12-13"
          startTime="2023-12-13 15:00:00"
          endTime="2023-12-13 18:00:00"
        />
        <WorkDetailCard
          type="regular"
          date="2023-12-13"
          startTime="2023-12-13 15:00:00"
          endTime="2023-12-13 18:00:00"
        />
      </FlexBox>
    </>
  );
}
