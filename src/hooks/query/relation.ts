import {
  PostRelationAdminBody,
  PostRelationBody,
  getRelation,
  getRelationList,
  postRelation,
  postRelationAdmin,
} from "@/apis/relation";
import { storeIdAtom } from "@/data/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { InviteSchedule } from "@/data/inviteSchedule";
import { usePostPlanList } from "./plan";
import { useGetMyQueryKey } from "./my";

interface UsePostRelationProps {
  storeId: string;
  memberId: string;
  body: PostRelationBody;
}

function useGetRelation(memberId: string) {
  const [storeId] = useAtom(storeIdAtom);
  const { data } = useQuery({
    queryKey: ["getRelation", memberId],
    queryFn: () => getRelation(storeId, memberId),
  });
  return { data };
}

function useGetRelationList() {
  const [storeId] = useAtom(storeIdAtom);
  const { data } = useQuery({
    queryKey: ["getRelationList"],
    queryFn: () => getRelationList(storeId),
  });
  return { data };
}

function usePostRelation() {
  const { mutateAsync } = useMutation({
    mutationKey: ["postRelationMutate"],
    mutationFn: async ({ storeId, memberId, body }: UsePostRelationProps) =>
      postRelation(storeId, memberId, body),
  });
  return { mutateAsync };
}

function usePostRelationAdmin() {
  const [storeId] = useAtom(storeIdAtom);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["postRelationMutate"],
    mutationFn: ({
      memberId,
      body,
    }: {
      memberId: string;
      body: PostRelationAdminBody;
    }) => postRelationAdmin(storeId, memberId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRelationList"],
      });
    },
  });
  return { mutate };
}

function useStaffJoin() {
  const { mutateAsync: postRelationMutate } = usePostRelation();
  const { mutate: postPlanListMutate } = usePostPlanList();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["StaffJoin"],
    mutationFn: async ({
      storeId,
      memberId,
      body,
      inviteSchedule,
    }: UsePostRelationProps & { inviteSchedule: InviteSchedule }) => {
      await postRelationMutate({ storeId, memberId, body });
      postPlanListMutate({ storeId, memberId, inviteSchedule });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [useGetMyQueryKey] });
      localStorage.removeItem("inviteDataId");
      router.push("/main");
    },
  });
  return { mutate };
}

export {
  useGetRelation,
  useGetRelationList,
  usePostRelation,
  usePostRelationAdmin,
  useStaffJoin,
};
