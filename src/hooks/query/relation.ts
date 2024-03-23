import {
  PostRelationAdminBody,
  PostRelationBody,
  getAllRelationList,
  getRelationList,
  postRelation,
  postRelationAdmin,
} from "@/apis/relation";
import { storeIdAtom } from "@/data/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

interface UsePostRelationProps {
  storeId: string;
  memberId: string;
  body: PostRelationBody;
}

function useGetRelationList(memberId: string) {
  const [storeId] = useAtom(storeIdAtom);
  const { data } = useQuery({
    queryKey: ["getRelationList"],
    queryFn: () => getRelationList(storeId, memberId),
  });
  return { data };
}

function useGetAllRelationList() {
  const [storeId] = useAtom(storeIdAtom);
  const { data } = useQuery({
    queryKey: ["getAllRelationList"],
    queryFn: () => getAllRelationList(storeId),
  });
  return { data };
}

function usePostRelation() {
  const { mutate, isSuccess } = useMutation({
    mutationKey: ["postRelationMutate"],
    mutationFn: ({ storeId, memberId, body }: UsePostRelationProps) =>
      postRelation(storeId, memberId, body),
  });
  return { mutate, isSuccess };
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

export {
  useGetAllRelationList,
  useGetRelationList,
  usePostRelation,
  usePostRelationAdmin,
};
