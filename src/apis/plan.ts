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

export { getPlanList, postPlan, putPlan };
export type { Plan, PostPlanBody };
