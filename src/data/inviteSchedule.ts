import { atom } from "jotai";

interface Schedule {
  workFrom: string;
  workUntil: string;
  restFrom: string;
  restUntil: string;
}

const scheduleInit: Schedule = {
  workFrom: "00:00",
  workUntil: "00:00",
  restFrom: "00:00",
  restUntil: "00:00",
};

interface InviteSchedule {
  mon: Schedule;
  tue: Schedule;
  wed: Schedule;
  thu: Schedule;
  fri: Schedule;
  sat: Schedule;
  sun: Schedule;
}

const inviteScheduleInit: InviteSchedule = {
  mon: { ...scheduleInit },
  tue: { ...scheduleInit },
  wed: { ...scheduleInit },
  thu: { ...scheduleInit },
  fri: { ...scheduleInit },
  sat: { ...scheduleInit },
  sun: { ...scheduleInit },
};

const inviteScheduleAtom = atom<InviteSchedule>(inviteScheduleInit);

export { inviteScheduleAtom, inviteScheduleInit, scheduleInit };
export type { InviteSchedule, Schedule };
