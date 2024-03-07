import { RoleType } from "@/apis/_type";
import { My } from "@/apis/my";
import { atom } from "jotai";

const myAtom = atom<My | null>(null);
const storeIdAtom = atom<string | null>(get => {
  const my = get(myAtom);
  return my?.relationList[0].storeId ?? null;
});
const roleAtom = atom<RoleType>(get => {
  const my = get(myAtom);
  return my?.relationList[0].role ?? "staff";
});
const manageMenuAtom = atom<"left" | "right">("left");

export { myAtom, storeIdAtom, roleAtom, manageMenuAtom };
