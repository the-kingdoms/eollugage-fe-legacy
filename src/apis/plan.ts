import { DateType } from "@/apis/_type";
import api, { ApiResponse } from "@/apis/network";

interface Plan extends PostPlanBody {
  id: "string";
  relationId: "string";
}

interface PostPlanBody {
  day: DateType;
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

async function getStorePlanList(storeId: string): Promise<Plan[]> {
  const { data } = await api.get(`/api/stores/${storeId}/plans`);
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
