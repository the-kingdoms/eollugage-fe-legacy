import { DayType } from "@/apis/_type";
import api, { ApiResponse } from "./network";

interface Plan extends PostPlanBody {
  id: "string";
  relationId: "string";
}

interface PostPlanBody {
  day: DayType;
  startTime: string;
  endTime: string;
  restStartTime: string;
  restEndTime: string;
}

async function getPlanList(storeId: string, memberId: string): Promise<Plan[]> {
  const { data } = await api.get(
    `/api/stores/${storeId}/relations/${memberId}/plans`,
  );
  return [
    {
      id: "string",
      relationId: "string",
      startTime: "2024-03-07T08:00:00.000Z",
      endTime: "2024-03-07T18:00:00.000Z",
      restStartTime: "2024-03-07T11:00:00.000Z",
      restEndTime: "2024-03-07T12:00:00.000Z",
      day: "Monday",
    },
  ]; // 추후 삭제 필요
  return data;
}

async function postPlan(
  storeId: string,
  memberId: string,
  body: PostPlanBody,
): Promise<ApiResponse> {
  const { data } = await api.post(
    `/api/stores/${storeId}/relations/${memberId}/plans`,
    body,
  );
  return data;
}

async function putPlan(
  storeId: string,
  memberId: string,
  planId: string,
  body: PostPlanBody,
): Promise<ApiResponse> {
  const { data } = await api.put(
    `/api/stores/${storeId}/relations/${memberId}/plans/${planId}`,
    body,
  );
  return data;
}

export { getPlanList, postPlan, putPlan, getStorePlanList };
export type { Plan, PostPlanBody };
