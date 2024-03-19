import { DayType } from "@/apis/_type";
import { ApiResponse } from "@/apis/network";
import { PostPlanBody, postPlan, putPlan } from "@/apis/plan";
import { storeIdAtom } from "@/data/global";
import {
  InviteSchedule,
  Schedule,
  dayTypeConvert,
} from "@/data/inviteSchedule";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

function createPostPlanBody(
  day: DayType,
  { workFrom, workUntil, restFrom, restUntil }: Schedule,
) {
  const body: PostPlanBody = {
    day,
    startTime: workFrom as string,
    endTime: workUntil as string,
    restStartTime: restFrom as string,
    restEndTime: restUntil as string,
  };
  return body;
}

function usePostPlanList() {
  const { mutate: postPlanListMutate } = useMutation({
    mutationKey: ["postPlanListMutate"],
    mutationFn: ({
      storeId,
      memberId,
      inviteSchedule,
    }: {
      storeId: string;
      memberId: string;
      inviteSchedule: InviteSchedule;
    }) => {
      const promiseList: Promise<ApiResponse>[] = [];
      Object.entries(inviteSchedule).forEach(([key, value]) => {
        const day = key as keyof InviteSchedule;
        const schedule = value as Schedule;
        const newPlan = createPostPlanBody(dayTypeConvert[day], schedule);
        if (schedule.workFrom !== null) {
          promiseList.push(postPlan(storeId, memberId, newPlan));
        }
      });
      return Promise.all(promiseList);
    },
  });
  return { postPlanListMutate };
}

function usePostPlan() {
  const { mutate: postPlanMutate, isSuccess } = useMutation({
    mutationKey: ["postPlanMutate"],
    mutationFn: ({
      storeId,
      memberId,
      body,
    }: {
      storeId: string;
      memberId: string;
      body: PostPlanBody;
    }) => {
      return postPlan(storeId, memberId, body);
    },
  });
  return { postPlanMutate, isSuccess };
}

function usePutPlan() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate: putPlanMutate } = useMutation({
    mutationKey: ["putPlanMutate"],
    mutationFn: ({
      planId,
      memberId,
      body,
    }: {
      planId: string;
      memberId: string;
      body: PostPlanBody;
    }) => {
      return putPlan(storeId, memberId, planId, body);
    },
  });
  return { putPlanMutate };
}

function useGetPlanList() {
  const [storeId] = useAtom(storeIdAtom);
  const [memberId] = useAtom(myMemberIdAtom);
  const { data: plans } = useQuery({
    queryKey: ["getPlanList"],
    queryFn: () => getPlanList(storeId, memberId),
  });
  return { plans };
}

export { usePostPlan, usePutPlan, usePostPlanList, useGetPlanList };
