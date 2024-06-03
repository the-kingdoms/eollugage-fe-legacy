import { DayType } from "@/apis/_type";
import { ApiResponse } from "@/apis/network";
import { PostPlanBody, getPlanList, postPlan, putPlan } from "@/apis/plan";
import { storeIdAtom } from "@/data/global";
import {
  InviteSchedule,
  Schedule,
  dayTypeConvert,
} from "@/data/inviteSchedule";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const { mutate } = useMutation({
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
  return { mutate };
}

function usePostPlan() {
  const { mutate, isSuccess } = useMutation({
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
  return { mutate, isSuccess };
}

function usePutPlan() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate } = useMutation({
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
  return { mutate };
}

function useGetPlanList(memberId: string) {
  const [storeId] = useAtom(storeIdAtom);
  const { data } = useQuery({
    queryKey: ["getPlanList", memberId],
    queryFn: () => getPlanList(storeId, memberId),
  });
  return { data };
}

export { usePostPlan, usePutPlan, usePostPlanList, useGetPlanList };
