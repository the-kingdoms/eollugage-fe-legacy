import { PostOrderBody, getOrderList, postOrder, putOrder } from "@/apis/order";
import { storeIdAtom } from "@/data/global";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

function useGetOrder() {
  const [storeId] = useAtom(storeIdAtom);
  const { data } = useQuery({
    queryKey: ["getOrderList"],
    queryFn: () => getOrderList(storeId),
  });
  return { data };
}

function usePostOrder() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate } = useMutation({
    mutationKey: ["postOrder"],
    mutationFn: (body: PostOrderBody) => postOrder(storeId, body),
  });
  return { mutate };
}

function usePutOrder() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate, isSuccess } = useMutation({
    mutationKey: ["putOrder"],
    mutationFn: ({ orderId, body }: { orderId: string; body: PostOrderBody }) =>
      putOrder(storeId, orderId, body),
  });
  return { mutate, isSuccess };
}

export { useGetOrder, usePostOrder, usePutOrder };
