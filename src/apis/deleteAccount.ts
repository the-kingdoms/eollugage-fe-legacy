import { myAtom } from "@/data/global";
import { quitReasonAtom } from "@/pages/mypage/quit";
import axios from "axios";
import dayjs from "dayjs";
import { useAtom } from "jotai";

const lambdaPath = process.env.LAMBDA_URL as string;

export async function postDeleteAccount(
  accountId: string,
  name: string,
  phoneNumber: string,
  time: string,
  reason: string,
) {
  console.log(process.env);
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_LAMBDA_URL as string,
    {
      accountId,
      name,
      phoneNumber,
      time,
      reason: reason.length === 0 ? "사유 미작성" : reason,
    },
  );
  return data;
}
