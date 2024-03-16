import { PostPlanBody, getPlanList, postPlan, putPlan } from "@/apis/plan";
import { useAtom } from "jotai";
import { storeIdAtom } from "@/data/global";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

function usePostPlan() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate: postPlanMutate } = useMutation({
    mutationKey: ["postPlanMutate"],
    mutationFn: ({
      memberId,
      body,
    }: {
      memberId: string;
      body: PostPlanBody;
    }) => {
      return postPlan(storeId, memberId, body);
    },
  });
  return { postPlanMutate };
}

function usePutPlan() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate: putPlanMutate } = useMutation({
    mutationKey: ["putPlanMutate"],
    mutationFn: ({
      memberId,
      body,
    }: {
      memberId: string;
      body: PostPlanBody;
    }) => {
      return putPlan(storeId, memberId, body);
    },
  });
  return { putPlanMutate };
}

export { usePostPlan, usePutPlan };
