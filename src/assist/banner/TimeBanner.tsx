import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import dayjs from "dayjs";

interface TimeBannerProps {
  DayClick: (direction: string) => void;
  dayDate: dayjs.Dayjs;
}

export default function TimeBanner({ DayClick, dayDate }: TimeBannerProps) {
  return (
    <FlexBox direction="row" className="w-full mt-6 mb-4">
      <Icon
        src="/icon/direction/left.svg"
        sz={24}
        className="ml-auto"
        onClick={() => DayClick("left")}
      />
      <div className="B4-medium text-neutral-500 w-full text-center">
        {dayDate.isSame(dayjs(), "day") && "오늘 "}
        {`(${dayDate.format("MM")} / ${dayDate.format("DD")})`}
      </div>
      {dayDate.isBefore(dayjs(), "day") && (
        <Icon
          src="/icon/direction/right.svg"
          sz={24}
          className="mr-auto"
          onClick={() => DayClick("right")}
        />
      )}
    </FlexBox>
  );
}
