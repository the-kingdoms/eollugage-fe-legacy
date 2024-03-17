import { StatusType } from "@/apis/_type";
import api, { ApiResponse } from "@/apis/network";

interface History extends PostHistoryBody {
  id: string;
  relationId: string;
}

interface PostHistoryBody {
  startTime: string;
  endTime: string;
  restStartTime: string;
  restEndTime: string;
  status: StatusType;
  date: string;
}

interface PostHistoryStatusBody {
  status: StatusType;
}

async function getHistoryList(
  storeId: string,
  memberId: string,
): Promise<History[]> {
  const { data } = await api.get(
    `/api/stores/${storeId}/relations/${memberId}/histories`,
  );
  return data;
}

async function postHistory(
  storeId: string,
  memberId: string,
  body: PostHistoryBody,
): Promise<ApiResponse> {
  const { data } = await api.post(
    `/api/stores/${storeId}/relations/${memberId}/histories`,
    body,
  );
  return data;
}

async function postHistoryStatus(
  storeId: string,
  memberId: string,
  historyId: string,
  body: PostHistoryStatusBody,
): Promise<ApiResponse> {
  const { data } = await api.post(
    `/api/stores/${storeId}/relations/${memberId}/histories/${historyId}/status`,
    body,
  );
  return data;
}

async function deleteHistory(
  storeId: string,
  memberId: string,
  historyId: string,
): Promise<void> {
  await api.delete(
    `/api/stores/${storeId}/relations/${memberId}/histories/${historyId}`,
  );
}

export { deleteHistory, getHistoryList, postHistory, postHistoryStatus };
export type { History, PostHistoryBody, PostHistoryStatusBody };
