import ApprovalProfile from "@/assist/ApprovalProfile";
import ButtonBar from "@modules/components/bars/ButtonBar";
import TextButton from "@modules/components/button/TextButton";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";
import { useState } from "react";

export default function Attendance() {
  const [buttonState, setButtonState] = useState<
    "approve" | "disapprove" | "decline"
  >("decline");

  const handleButtonClick = () => {
    if (buttonState === "decline") {
      setButtonState("approve");
    }
  };

  const handleClick = () => {
    setButtonState("disapprove");
  };

  const profiles = [
    { name: "얼루가", position: "매니저", time: "00:00 - 00:00" },
    { name: "방기연", position: "매니저", time: "00:00 - 00:00" },
    { name: "방기연", position: "아르바이트", time: "00:00 - 00:00" },
  ];

  return (
    <FlexBox direction="col" className="w-full px-2">
      <FlexBox direction="row">
        <div className="B4-medium text-neutral-500">
          오늘 {dayjs().format("MM")} / {dayjs().format("DD")}
        </div>
      </FlexBox>
      <FlexBox direction="col" className="gap-6 w-full px-2">
        {profiles.map((people, index) => (
          <ApprovalProfile
            key={index}
            name={people.name}
            position={people.position}
            time={people.time}
            buttonstate={buttonState}
            handleonClick={handleClick}
          />
        ))}
      </FlexBox>
      <ButtonBar
        button={
          <TextButton size="L" text="일괄 승인" onClick={handleButtonClick} />
        }
      />
    </FlexBox>
  );
}
