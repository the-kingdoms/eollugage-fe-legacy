import { My } from "@/apis/my";
import { atom } from "jotai";

const myAtom = atom<My | null>(null);
const storeIdAtom = atom<string | null>(null);
const authAtom = atom<"owner" | "manager" | "staff">(get => {
  const my = get(myAtom);
  my?.relationList.forEach(relation => {
    if (relation.storeId === get(storeIdAtom)) {
      return relation.role;
    }
  });
  return "staff";
});

export { myAtom, storeIdAtom, authAtom };
