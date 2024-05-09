import axios from "axios";

const LAMBDA_URL = process.env.NEXT_PUBLIC_LAMBDA_URL as string;
export async function postDeleteAccount(
  accountId: string,
  name: string,
  phoneNumber: string,
  time: string,
  reason: string,
) {
  const { data } = await axios.post(`${LAMBDA_URL}/slack_notification`, {
    title: "회원 탈퇴 신청",
    content: {
      accountId,
      name,
      phoneNumber,
      time,
      reason: reason.length === 0 ? "사유 미작성" : reason,
    },
  });
  return data;
}
