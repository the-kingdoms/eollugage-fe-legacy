import { StatusType } from "@/apis/_type";

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
  // const { data } = await api.get(`/api/stores/${storeId}`);
  return [
    {
      id: "string",
      relationId: "string",
      startTime: "08:00:00.000Z",
      endTime: "18:00:00.000Z",
      restStartTime: "11:00:00.000Z",
      restEndTime: "12:00:00.000Z",
      status: "approve",
      date: "2024-03-07",
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

export { deleteHistory, getHistoryList, postHistory, postHistoryStatus };
export type { History, PostHistoryBody, PostHistoryStatusBody };
