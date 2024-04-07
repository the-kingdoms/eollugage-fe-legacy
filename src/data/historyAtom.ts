import { History } from "@/apis/history";
import dayjs from "dayjs";
import { atom } from "jotai";

export const addWorkModalAtom = atom<boolean>(false);
addWorkModalAtom.debugLabel = "addWorkModalAtom";

// 근무스케줄 캘린더에 선택된 날짜
export const selectedDateAtom = atom<dayjs.Dayjs>(dayjs());
selectedDateAtom.debugLabel = "selectedDateAtom";

export const filteredHistoryAtom = atom<History[]>([]);
selectedDateAtom.debugLabel = "filteredHistoryAtom";
