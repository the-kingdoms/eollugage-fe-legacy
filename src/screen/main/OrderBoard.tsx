import { Order, PostOrderBody } from "@/apis/order";
import { storeIdAtom } from "@/data/global";
import { useGetOrder, usePostOrder, usePutOrder } from "@/hooks/query/order";
import TextCheckField from "@modules/components/textfields/TextCheckField";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
<<<<<<< HEAD
import TextCheckField from "@modules/components/textfields/TextCheckField";
import { Dispatch, SetStateAction, useState } from "react";
import { Order, PostOrderBody } from "@/apis/order";
import { storeIdAtom } from "@/data/global";
import { useAtom } from "jotai";
import { useGetOrder, usePostOrder, usePutOrder } from "@/hooks/query/order";
=======
import { useAtom } from "jotai";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
>>>>>>> fab097fdbb6312a1e758d9289b0affd12028a5aa

export default function OrderBoard() {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [storeId] = useAtom(storeIdAtom);
  const { orders } = useGetOrder();
  const { postOrderMutate } = usePostOrder();
  const { putOrderMutate } = usePutOrder();

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
