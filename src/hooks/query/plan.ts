import { PostPlanBody, getPlanList, postPlan, putPlan } from "@/apis/plan";
import { useAtom } from "jotai";
import { storeIdAtom } from "@/data/global";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { InviteSchedule, Schedule } from "@/data/inviteSchedule";
import { DayType } from "@/apis/_type";
import { dayTypeConvert } from "@/data/inviteSchedule";

function createPostPlanBody(
  day: DayType,
  { workFrom, workUntil, restFrom, restUntil }: Schedule,
) {
  const body: PostPlanBody = {
    day: day,
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
      const promiseList: Promise<void>[] = [];
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

export { usePostPlan, usePutPlan, usePostPlanList };
