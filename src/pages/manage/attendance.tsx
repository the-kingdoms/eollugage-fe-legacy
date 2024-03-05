import ProfileDiscription from "@/assist/ProfileDiscription";
import StateButtonWrapper from "@/assist/StateButtonWrapper";
import ButtonBar from "@modules/components/bars/ButtonBar";
import TextButton from "@modules/components/button/TextButton";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import TopTitle from "@modules/layout/TopTitle";
import dayjs from "dayjs";
import { useState } from "react";

export default function Attendance() {
  type ButtonState = "approve" | "disapprove" | "decline";

  const profiledata = [
    {
      name: "얼루가",
      position: "매니저",
      time: "00:00 - 00:00",
      buttonState: "decline" as ButtonState,
    },
    {
      name: "방기연",
      position: "매니저",
      time: "00:00 - 00:00",
      buttonState: "decline" as ButtonState,
    },
    {
      name: "방기연",
      position: "아르바이트",
      time: "00:00 - 00:00",
      buttonState: "decline" as ButtonState,
    },
  ];

  const [profiles, setProfiles] = useState(profiledata);
  const [isInactive, setIsInactive] = useState(false);
  const [date, setDate] = useState(dayjs());

  const allButtonClick = () => {
    const allProfiles = profiles.map(newpeople => ({
      ...newpeople,
      buttonState:
        newpeople.buttonState === "decline" ? "approve" : newpeople.buttonState,
    }));
    setProfiles(allProfiles);
    setIsInactive(true);
  };

  const profileClick = (index: number) => {
    const updatedProfile = [...profiles];
    if (updatedProfile[index].buttonState === "decline") {
      updatedProfile[index].buttonState = "disapprove";
      setProfiles(updatedProfile);
    }
  };

  const DayMove = (direction: string) => {
    const newDate =
      direction === "left" ? date.subtract(1, "day") : date.add(1, "day");
    setDate(newDate);
    setProfiles(profiledata);
    const isAnyDeclined = profiles.some(Day => Day.buttonState === "decline");
    if (isAnyDeclined) {
      setIsInactive(false);
    }
  };

  return (
    <FlexBox direction="col" className="w-full h-full justify-between">
      <FlexBox direction="col" className="w-full px-2">
        <TopTitle title="출퇴근 관리" />
        <FlexBox direction="row" className="w-full mt-6 mb-4">
          <Icon
            src={"/icon/direction/left.svg"}
            sz={24}
            className="ml-auto"
            onClick={() => DayMove("left")}
          />
          <div className="B4-medium text-neutral-500 w-full text-center">
            {date.isSame(dayjs(), "day") && "오늘 "}
            {"("}
            {date.format("MM")} / {date.format("DD")}
            {")"}
          </div>
          {date.isBefore(dayjs(), "day") && (
            <Icon
              src={"/icon/direction/right.svg"}
              sz={24}
              className="mr-auto"
              onClick={() => DayMove("right")}
            />
          )}
        </FlexBox>
        <FlexBox direction="col" className="gap-6 w-full px-2">
          {profiles.map((people, index) => (
            <StateButtonWrapper
              key={index}
              buttonClick={() => profileClick(index)}
              buttonState={people.buttonState}
            >
              <ProfileDiscription
                key={index}
                name={people.name}
                position={people.position}
                time={people.time}
              />
            </StateButtonWrapper>
          ))}
        </FlexBox>
      </FlexBox>
      <ButtonBar
        button={
          <TextButton
            size="L"
            text="일괄 승인"
            onClick={allButtonClick}
            inactive={isInactive}
          />
        }
      />
    </FlexBox>
  );
}
