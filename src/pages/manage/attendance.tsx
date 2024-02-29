import ApprovalProfile from "@/assist/ApprovalProfile";
import ButtonBar from "@modules/components/bars/ButtonBar";
import TextButton from "@modules/components/button/TextButton";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import TopTitle from "@modules/layout/TopTitle";
import dayjs from "dayjs";
import { ApprovalProfileProps } from "@/assist/ApprovalProfile";
import { useState } from "react";

export default function Attendance() {
  const [profiles, setProfiles] = useState<ApprovalProfileProps[]>([
    {
      name: "얼루가",
      position: "매니저",
      time: "00:00 - 00:00",
      buttonState: "decline",
    },
    {
      name: "방기연",
      position: "매니저",
      time: "00:00 - 00:00",
      buttonState: "decline",
    },
    {
      name: "방기연",
      position: "아르바이트",
      time: "00:00 - 00:00",
      buttonState: "decline",
    },
  ]);

  const allButtonClick = () => {
    const allProfiles = profiles.map(people => ({
      ...people,
      buttonState:
        people.buttonState === "decline" ? "approve" : people.buttonState,
    }));
    setProfiles(allProfiles);
  };

  const profileClick = (index: number) => {
    const updatedProfile = [...profiles];
    if (updatedProfile[index].buttonState === "decline") {
      updatedProfile[index].buttonState = "disapprove";
      setProfiles(updatedProfile);
    }
  };

  return (
    <FlexBox direction="col" className="w-full h-full justify-between">
      <FlexBox direction="col" className="w-full">
        <TopTitle title="출퇴근 관리" />
        <FlexBox direction="row" className="w-full mt-6 mb-4">
          <Icon src={"/icon/direction/left.svg"} sz={24} className="mr-28" />
          <div className="B4-medium text-neutral-500">
            오늘 {"("}
            {dayjs().format("MM")} / {dayjs().format("DD")}
            {")"}
          </div>
        </FlexBox>
        <FlexBox direction="col" className="gap-6 w-full px-2">
          {profiles.map((people, index) => (
            <ApprovalProfile
              key={index}
              name={people.name}
              position={people.position}
              time={people.time}
              buttonState={people.buttonState}
              buttonClick={() => profileClick(index)}
            />
          ))}
        </FlexBox>
      </FlexBox>
      <ButtonBar
        button={
          <TextButton size="L" text="일괄 승인" onClick={allButtonClick} />
        }
      />
    </FlexBox>
  );
}
