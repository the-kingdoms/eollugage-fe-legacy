import dayjs from "dayjs";
import { History } from "@/apis/history";

function calculateWorkMinutes(
  endTime: string,
  startTime: string,
  restEndTime: string,
  restStartTime: string,
): number {
  function parseTime(timeString: string) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const time = new Date();
    time.setHours(hours, minutes, 0, 0);
    return time;
  }
  const shiftEnd = parseTime(endTime);
  const shiftStart = parseTime(startTime);
  const restStart = parseTime(restStartTime);
  const restEnd = parseTime(restEndTime);

  const totalWorkMinute =
    (shiftEnd.getTime() - shiftStart.getTime()) / (1000 * 60);
  const restMinute = (restEnd.getTime() - restStart.getTime()) / (1000 * 60);

  return totalWorkMinute - restMinute;
}

export function historyToWorkHistory(historys: History[]) {
  const endDate = dayjs().endOf("week");
  const startDate = endDate.subtract(9, "day");

  const filteredHistorys = historys.filter(history => {
    const historyDate = dayjs(history.date);
    return historyDate.isAfter(startDate) && historyDate.isBefore(endDate);
  });

  const newWorkHistoryList = filteredHistorys.map(history => ({
    startDate: dayjs(history.date),
    endDate: dayjs(history.date),
    workingDays: 1,
    workingMinutes: calculateWorkMinutes(
      history.endTime,
      history.startTime,
      history.restEndTime,
      history.restStartTime,
    ),
    overtimeMinutes: 0, // 나중에 필요시 개선
  }));
  return newWorkHistoryList;
}
