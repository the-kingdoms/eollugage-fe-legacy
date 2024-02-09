import FlexBox from "@modules/layout/FlexBox";

export default function Schedule() {
  return (
    <FlexBox direction="col" className="gap-3 w-full px-4">
      <FlexBox className="w-full justify-between">
        <FlexBox className="gap-1">
          <div className="H4-bold">05</div>
          <div className="B3-medium text-neutral-500">목</div>
        </FlexBox>
        <FlexBox className="gap-4">
          <FlexBox className="gap-1">
            <div className="w-3 h-4 bg-red-600 rounded" />
            <div className="B5-medium text-neutral-600">매니저</div>
          </FlexBox>
          <FlexBox className="gap-1">
            <div className="w-3 h-4 bg-orange-600 rounded" />
            <div className="B5-medium text-neutral-600">알바</div>
          </FlexBox>
          <FlexBox className="gap-1">
            <div className="w-3 h-4 bg-black rounded" />
            <div className="B5-medium text-neutral-600">기타</div>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox className="gap-1 w-full justify-start">
        <div className="text-zinc-400 text-[10px]">00:00</div>
        <div className="w-full h-px bg-gray-200" />
      </FlexBox>
    </FlexBox>
  );
}
