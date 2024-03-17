import { RoleType } from "@/apis/_type";
import { My } from "@/apis/my";
import { atom } from "jotai";

const myAtom = atom<My | null>(null);
const storeIdAtom = atom<string>(get => {
  const my = get(myAtom);
<<<<<<< HEAD
  return my?.relationList[0]?.storeId ?? ""; // storeId ?
=======
  return my?.relationList[0]?.storeId ?? "";
>>>>>>> fab097fdbb6312a1e758d9289b0affd12028a5aa
});
const myMemberIdAtom = atom<string>(get => {
  const my = get(myAtom);
  return my?.id ?? "";
});
const roleAtom = atom<RoleType>(get => {
  const my = get(myAtom);
  return my?.relationList[0].role ?? "STAFF";
});
const manageMenuAtom = atom<"left" | "right">("left");

export { manageMenuAtom, myAtom, myMemberIdAtom, roleAtom, storeIdAtom };
