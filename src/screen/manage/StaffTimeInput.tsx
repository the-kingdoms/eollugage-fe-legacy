import TimeField from "@modules/components/textfields/TimeField";
import FlexBox from "@modules/layout/FlexBox";
import { useState } from "react";

interface StaffTimeProps {
  title: string;
  start: string;
  end: string;
}

export default function StaffTimeInput({ title, start, end }: StaffTimeProps) {
  const [startTime, setStartTime] = useState<string>(start);
  const [endTime, setEndTime] = useState<string>(end);

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
