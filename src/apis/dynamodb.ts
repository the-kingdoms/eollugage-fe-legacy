import { InviteSchedule } from "@/data/inviteSchedule";
import axios from "axios";

export interface InviteResponse {
  id: string;
  inviteData: InviteDataType;
}
interface InviteDataType {
  storeId: string;
  position: string;
  schedule: InviteSchedule;
  createdAt: string;
}

async function getInviteData(inviteDataId: string) {
  const { data } = await axios.get<InviteResponse>(
    `/api/dynamoDB?id=${inviteDataId}`,
  );
  return data;
}

async function postInviteData(body: InviteResponse) {
  const { data } = await axios.post("/api/dynamoDB", body);
  return data;
}

export { getInviteData, postInviteData };
