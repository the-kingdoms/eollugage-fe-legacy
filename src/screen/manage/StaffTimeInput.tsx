import TimeField from "@modules/components/textfields/TimeField";
import FlexBox from "@modules/layout/FlexBox";

interface StaffTimeProps {
  title: string;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
}

export default function StaffTimeInput({
  title,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: StaffTimeProps) {
  return (
    <FlexBox direction="col" className="gap-2 w-full items-start">
      <div className="text-Gray6 B4-medium">{title}</div>
      <FlexBox className="w-full justify-between">
        <TimeField value={startTime} setValue={setStartTime} />
        <hr className="h-0.5 w-2 bg-Gray3" />
        <TimeField value={endTime} setValue={setEndTime} />
      </FlexBox>
    </FlexBox>
  );
}
