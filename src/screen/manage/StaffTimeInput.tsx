import TimeField from "@modules/components/textfields/TimeField";
import FlexBox from "@modules/layout/FlexBox";
import { useEffect, useState } from "react";

interface StaffTimeProps {
  title: string;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StaffTimeInput({
  title,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  setIsFocused,
}: StaffTimeProps) {
  const [isFocused1, setIsFocused1] = useState<boolean>(false);
  const [isFocused2, setIsFocused2] = useState<boolean>(false);

  useEffect(() => {
    if (setIsFocused && (isFocused1 || isFocused2)) setIsFocused(true);
    else if (setIsFocused !== undefined) setIsFocused(false);
  }, [isFocused1, isFocused2]);

  return (
    <FlexBox direction="col" className="gap-2 w-full items-start">
      <div className="text-Gray6 B4-medium">{title}</div>
      <FlexBox className="w-full justify-between">
        <TimeField
          value={startTime}
          setValue={setStartTime}
          setIsFocused={setIsFocused1}
        />
        <hr className="h-0.5 w-2 bg-Gray3" />
        <TimeField
          value={endTime}
          setValue={setEndTime}
          setIsFocused={setIsFocused2}
        />
      </FlexBox>
    </FlexBox>
  );
}
