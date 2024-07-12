import { InviteResponse } from "@/screen/manage/ShareLink";
import axios from "axios";

async function getInviteData(inviteDataId: string) {
  const { data } = await axios.get<InviteResponse>(
    `/api/dynamoDB?id=${inviteDataId}`,
  );
  return data;
}

export { getInviteData };
