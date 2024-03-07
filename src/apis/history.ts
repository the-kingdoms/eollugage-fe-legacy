import { DateType, StatusType } from "@/apis/_type";
import api from "@/apis/network";

interface History extends PostHistoryBody {
  id: string;
  relationId: string;
}

interface PostHistoryBody {
  startDate: string;
  endDate: string;
  restStartTime: string;
  restEndTime: string;
  status: StatusType;
  date: DateType;
}

interface PostHistoryStatusBody {
  status: StatusType;
}

async function getHistoryList(
  storeId: string,
  memberId: string,
): Promise<History[]> {
  // const { data } = await api.get(`/api/stores/${storeId}`);
  return [
    {
      id: "string",
      relationId: "string",
      startDate: "2024-03-07T08:00:00.000Z",
      endDate: "2024-03-07T18:00:00.000Z",
      restStartTime: "2024-03-07T11:00:00.000Z",
      restEndTime: "2024-03-07T12:00:00.000Z",
      status: "approved",
      date: "Monday",
    },
  ];
  // return data;
}

async function postHistory(
  storeId: string,
  memberId: string,
  body: PostHistoryBody,
): Promise<void> {}

async function postHistoryStatus(
  storeId: string,
  memberId: string,
  historyId: string,
  body: PostHistoryStatusBody,
): Promise<void> {}

async function deleteHistory(
  storeId: string,
  memberId: string,
  historyId: string,
): Promise<void> {}

export { getHistoryList, postHistory, postHistoryStatus, deleteHistory };
export type { History, PostHistoryBody, PostHistoryStatusBody };
