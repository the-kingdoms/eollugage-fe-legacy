import { History } from "@/apis/history";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

interface WorkHistory {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  workingDays: number;
  workingMinutes: number;
  overtimeMinutes: number;
}

export function calculateWorkMinutes(historys: History[]): number {
  let newWorkingMinutes = 0;
  historys.forEach(item => {
    const startDate = dayjs(`${item.date}T${item.startTime}`);
    const endDate = dayjs(`${item.date}T${item.endTime}`);
    const diffMinutes = endDate.diff(startDate, "minute");
    newWorkingMinutes += diffMinutes;
  });
  return newWorkingMinutes;
}

export function historyToWorkHistory(historys: History[]) {
  const sortedHistorys = historys.sort((a, b) =>
    dayjs(a.date).diff(dayjs(b.date)),
  );

  const workHistoryList: WorkHistory[] = [];

  let currentWeekStart = dayjs(sortedHistorys[0].date).startOf("isoWeek");

  let weekHistories: History[] = [];

  sortedHistorys.forEach(history => {
    const historyDate = dayjs(history.date);
    if (historyDate.isBefore(currentWeekStart.add(7, "day"))) {
      weekHistories.push(history);
    } else {
      const weekEnd = currentWeekStart.endOf("isoWeek");
      const workingMinutes = calculateWorkMinutes(weekHistories);
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
  const lastWorkingMinutes = calculateWorkMinutes(weekHistories);
  workHistoryList.push({
    startDate: currentWeekStart,
    endDate: lastWeekEnd,
    workingDays: weekHistories.length,
    workingMinutes: lastWorkingMinutes,
    overtimeMinutes: 0,
  });

  return workHistoryList;
}

export type { WorkHistory };
