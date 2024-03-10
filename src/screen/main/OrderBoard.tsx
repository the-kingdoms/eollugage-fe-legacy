import React, { useEffect } from "react";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import TextCheckField from "@modules/components/textfields/TextCheckField";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Order,
  PostOrderBody,
  getOrderList,
  postOrder,
  putOrder,
} from "@/apis/order";
import { storeIdAtom } from "@/data/global";
import { useAtom } from "jotai";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useGetOrder, usePostOrder, usePutOrder } from "@/hooks/query/order";

export default function () {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [storeId] = useAtom(storeIdAtom);
  const { orders } = useGetOrder(storeId);
  const { postOrderMutate } = usePostOrder(storeId);
  const { putOrderMutate } = usePutOrder(storeId);

  useEffect(() => {
    if (orders) {
      setOrderList(orders);
    }
  }, [orders]);

  const addOrder = async () => {
    const newOrder: PostOrderBody = { content: "", isClicked: false }; // 새 발주

    postOrderMutate(newOrder);
    setOrderList([
      ...orderList,
      { ...newOrder, id: Date.now().toString(), storeId },
    ]);
  };

  function setOrder(index: number): Dispatch<SetStateAction<string>> {
    return value => {
      const newOrderList = [...orderList];
      newOrderList[index].content = value as string;
      setOrderList(newOrderList);
      putOrderMutate(newOrderList[index].storeId, newOrderList[index]);
    };
  }

  return (
    <FlexBox direction="col" className="w-full gap-4">
      <FlexBox direction="row" className="w-full justify-between">
        <div className="H5-bold">발주 보드</div>
        <Icon src="/icon/control/plus_gray.svg" sz={32} onClick={addOrder} />
      </FlexBox>
      {orderList.map((order, i) => (
        <TextCheckField
          key={order.id}
          value={order.content}
          setValue={setOrder(i)}
          placeholder={`항목을 추가해요\n설명은 안쓰셔도 돼요`}
        />
      ))}
    </FlexBox>
  );
}
