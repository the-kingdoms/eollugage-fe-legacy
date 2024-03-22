import { PostOrderBody, getOrderList, postOrder, putOrder } from "@/apis/order";
import { storeIdAtom } from "@/data/global";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

function useGetOrder() {
  const [storeId] = useAtom(storeIdAtom);
  const { data: orders } = useQuery({
    queryKey: ["getOrderList"],
    queryFn: () => getOrderList(storeId),
  });
  return { orders };
}

function usePostOrder() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate } = useMutation({
    mutationKey: ["postOrder"],
    mutationFn: (body: PostOrderBody) => postOrder(storeId, body),
  });
  const postOrderMutate = (body: PostOrderBody) => {
    mutate(body);
  };
  return { postOrderMutate };
}

function usePutOrder() {
  const [storeId] = useAtom(storeIdAtom);
  const { mutate, isSuccess } = useMutation({
    mutationKey: ["putOrder"],
    mutationFn: ({ orderId, body }: { orderId: string; body: PostOrderBody }) =>
      putOrder(storeId, orderId, body),
  });
  const putOrderMutate = (orderId: string, body: PostOrderBody) => {
    mutate({ orderId, body });
  };
  return { putOrderMutate, isSuccess };
}

export { useGetOrder, usePostOrder, usePutOrder };
