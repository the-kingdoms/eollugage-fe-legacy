import { DateType } from "@/apis/_type";

interface Plan extends PostPlanBody {
  id: "string";
  relationId: "string";
}

interface PostPlanBody {
  date: DateType;
  startTime: string;
  endTime: string;
  restStartTime: string;
  restEndTime: string;
}

async function getPlanList(storeId: string, memberId: string): Promise<Plan[]> {
  // const { data } = await api.get(`/api/stores/${storeId}`);
  return [
    {
      id: "string",
      relationId: "string",
      startTime: "2024-03-07T08:00:00.000Z",
      endTime: "2024-03-07T18:00:00.000Z",
      restStartTime: "2024-03-07T11:00:00.000Z",
      restEndTime: "2024-03-07T12:00:00.000Z",
      date: "Monday",
    },
  ];
  // return data;
}

async function postPlan(
  storeId: string,
  memberId: string,
  body: PostPlanBody,
): Promise<void> {}

async function putPlan(
  storeId: string,
  memberId: string,
  body: PostPlanBody,
): Promise<void> {}

export { getPlanList, postPlan, putPlan };
export type { Plan, PostPlanBody };
