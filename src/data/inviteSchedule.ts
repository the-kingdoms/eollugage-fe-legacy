import { DayType } from "@/apis/_type";
import { atom } from "jotai";

interface Schedule {
  workFrom: string | null;
  workUntil: string | null;
  restFrom: string | null;
  restUntil: string | null;
}

const scheduleInit: Schedule = {
  workFrom: null,
  workUntil: null,
  restFrom: null,
  restUntil: null,
};

interface InviteSchedule {
  월: Schedule;
  화: Schedule;
  수: Schedule;
  목: Schedule;
  금: Schedule;
  토: Schedule;
  일: Schedule;
}

const inviteScheduleInit: InviteSchedule = {
  월: { ...scheduleInit },
  화: { ...scheduleInit },
  수: { ...scheduleInit },
  목: { ...scheduleInit },
  금: { ...scheduleInit },
  토: { ...scheduleInit },
  일: { ...scheduleInit },
};

const inviteScheduleAtom = atom<InviteSchedule>(inviteScheduleInit);

const dayTypeConvert: { [key: string]: DayType } = {
  월: "Monday",
  화: "Tuesday",
  수: "Wednesday",
  목: "Thursday",
  금: "Friday",
  토: "Saturday",
  일: "Sunday",
};

export { inviteScheduleAtom, inviteScheduleInit, scheduleInit, dayTypeConvert };
export type { InviteSchedule, Schedule };
export const selectedPositionAtom = atom("");
