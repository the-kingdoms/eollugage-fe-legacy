import {
  getPlanList,
  postPlan,
  putPlan,
  getStorePlanList,
  PostPlanBody,
} from "@/apis/plan";
import { useAtom } from "jotai";
import { storeIdAtom, myMemberIdAtom } from "@/data/global";
import { useMutation, useQuery } from "@tanstack/react-query";

function useGetPlanList() {
  const [storeId] = useAtom(storeIdAtom);
  const [memberId] = useAtom(myMemberIdAtom);
  const { data: plans } = useQuery({
    queryKey: ["getPlanList"],
    queryFn: () => getPlanList(storeId, memberId),
  });
  return { plans };
}

export { useGetPlanList };
