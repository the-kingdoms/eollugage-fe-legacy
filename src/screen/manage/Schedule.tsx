import Calender from "@modules/components/calender/Calender";
import ScheduleList, {
  ScheduleListProps,
} from "@modules/components/list/ScheduleList";
import Divider from "@modules/layout/Divider";
import FlexBox from "@modules/layout/FlexBox";
import dayjs from "dayjs";

export default function Schedule() {
  const schedules: ScheduleListProps[] = [
    { name: "방기연", position: "etc", time: "00:00 ~ 00:00" },
    { name: "방기연", position: "manager", time: "00:00 ~ 00:00" },
    { name: "방기연", position: "parttime", time: "00:00 ~ 00:00" },
  ];

  return (
    <FlexBox direction="col" className="gap-3 w-full">
      <Calender />
      <Divider />
      <FlexBox direction="col" className="w-full px-4 gap-3">
        <FlexBox className="w-full justify-between">
          <FlexBox className="gap-1">
            <div className="H4-bold">{dayjs().format("DD")}</div>
            <div className="B3-medium text-neutral-500">
              {dayjs().format("ddd")}
            </div>
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
        <FlexBox direction="col" className="gap-2">
          {schedules.map((plan, index) => (
            <ScheduleList
              key={index}
              name={plan.name}
              position={plan.position}
              time={plan.time}
            />
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
