import { StatusType } from "@/apis/_type";
import api, { ApiResponse } from "@/apis/network";
import { Relation } from "@/apis/relation";
import { My } from "@/apis/my";
import { Plan } from "@/apis/plan";

interface HistoryRelation extends Relation {
  member: My;
  planList: Plan[];
}

interface AllHistory extends History {
  relation: HistoryRelation;
}

interface History extends PostHistoryBody {
  id: string;
  status: StatusType;
  relationId: string;
  relation: {
    position: string;
    member: {
      name: string;
      phone: string;
    };
  };
}

interface PostHistoryBody {
  startTime: string;
  endTime: string;
  restStartTime: string;
  restEndTime: string;
  date: string;
}

interface PostHistoryStatusBody {
  status: StatusType;
}

async function getAllMemberHistory(storeId: string): Promise<AllHistory[]> {
  const { data } = await api.get(`/api/stores/${storeId}/histories`);
  return data;
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

async function getAllMemberHistoryByDate(
  storeId: string,
  date: string,
): Promise<AllHistory[]> {
  const { data } = await api.get(
    `/api/stores/${storeId}/histories/date/${date}`,
  );
  return data;
}

async function getHistoryListByDate(
  storeId: string,
  memberId: string,
  date: string,
): Promise<History[]> {
  const { data } = await api.get(
    `/api/stores/${storeId}/relations/${memberId}/histories/date/${date}`,
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

export {
  getAllMemberHistory,
  getHistoryList,
  getAllMemberHistoryByDate,
  getHistoryListByDate,
  postHistory,
  postHistoryStatus,
  deleteHistory,
};
export type {
  History,
  PostHistoryBody,
  PostHistoryStatusBody,
  AllHistory,
  HistoryRelation,
};
