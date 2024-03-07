import { My } from "@/apis/my";
import { atom } from "jotai";

const myAtom = atom<My | null>(null);
const storeIdAtom = atom<string | null>(null);

export { myAtom, storeIdAtom };
