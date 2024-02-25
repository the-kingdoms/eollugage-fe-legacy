import FlexBox from "@modules/layout/FlexBox";

interface StaffTimeProps {
  title: string;
}

export default function StaffTimeInput({ title }: StaffTimeProps) {
  return (
    <FlexBox direction="col" className="gap-2 w-full items-start">
      <div className="text-Gray6 B4-medium">{title}</div>
      <FlexBox className="w-full justify-between">
        <input
          className="bg-Gray6 rounded text-Gray3 B2-regular w-[148px] h-10 text-center outline-none"
          placeholder="00:00"
        />
        <hr className="h-0.5 w-2 bg-Gray3" />
        <input
          className="bg-Gray6 rounded text-Gray3 B2-regular w-[148px] h-10 text-center outline-none"
          placeholder="00:00"
        />
      </FlexBox>
    </FlexBox>
  );
}
