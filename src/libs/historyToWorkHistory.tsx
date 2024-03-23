import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
import { History } from "@/apis/history";

interface WorkHistory {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  workingDays: number;
  workingMinutes: number;
  overtimeMinutes: number;
}

export function calculateWorkMinutes(
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
  const sortedHistorys = historys.sort((a, b) =>
    dayjs(a.date).diff(dayjs(b.date)),
  );

  let workHistoryList: WorkHistory[] = [];

  if (sortedHistorys.length > 0) {
    let currentWeekStart = dayjs(sortedHistorys[0].date).startOf("isoWeek");
    let weekHistories: History[] = [];

    sortedHistorys.forEach(history => {
      const historyDate = dayjs(history.date);
      if (historyDate.isBefore(currentWeekStart.add(7, "day"))) {
        weekHistories.push(history);
      } else {
        const weekEnd = currentWeekStart.endOf("isoWeek");
        const workingMinutes = weekHistories.reduce(
          (acc, curr) =>
            acc +
            calculateWorkMinutes(
              curr.endTime,
              curr.startTime,
              curr.restEndTime,
              curr.restStartTime,
            ),
          0,
        );
        workHistoryList.push({
          startDate: currentWeekStart,
          endDate: weekEnd,
          workingDays: weekHistories.length,
          workingMinutes,
          overtimeMinutes: 0, // 나중에 추가해야할듯합니다
        });

        currentWeekStart = historyDate.startOf("isoWeek");
        weekHistories = [history];
      }
    });

    const lastWeekEnd = currentWeekStart.endOf("isoWeek");
    const lastWorkingMinutes = weekHistories.reduce(
      (acc, curr) =>
        acc +
        calculateWorkMinutes(
          curr.endTime,
          curr.startTime,
          curr.restEndTime,
          curr.restStartTime,
        ),
      0,
    );
    workHistoryList.push({
      startDate: currentWeekStart,
      endDate: lastWeekEnd,
      workingDays: weekHistories.length,
      workingMinutes: lastWorkingMinutes,
      overtimeMinutes: 0,
    });
  }

  return workHistoryList;
}
