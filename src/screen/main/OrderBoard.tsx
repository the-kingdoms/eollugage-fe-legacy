import { Order, PostOrderBody } from "@/apis/order";
import { storeIdAtom } from "@/data/global";
import { useGetOrder, usePostOrder, usePutOrder } from "@/hooks/query/order";
import TextCheckField from "@modules/components/textfields/TextCheckField";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import { useAtom } from "jotai";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function OrderBoard() {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [storeId] = useAtom(storeIdAtom);
  const { data: orders } = useGetOrder();
  const { mutate: postOrderMutate } = usePostOrder();
  const { mutate: putOrderMutate } = usePutOrder();

  useEffect(() => {
    if (orders) {
      setOrderList(orders);
    }
  }, [orders]);

  const addOrder = async () => {
    const newOrder: PostOrderBody = {
      content: "",
      isClicked: false,
    }; // 새 발주

    setOrderList([...orderList, { ...newOrder, id: "", storeId }]);
  };

  function setOrder(index: number): Dispatch<SetStateAction<string>> {
    return value => {
      const newOrderList = [...orderList];
      newOrderList[index].content = value as string;
      setOrderList(newOrderList);
    };
  }

  function makeOrder(index: number) {
    if (orderList[index].id === "") {
      postOrderMutate(orderList[index]);
    } else {
      putOrderMutate({ orderId: orderList[index].id, body: orderList[index] });
    }
  }

  function setChecked(index: number): Dispatch<SetStateAction<boolean>> {
    return () => {
      const newOrderList = [...orderList];
      newOrderList[index].isClicked = !newOrderList[index].isClicked;
      setOrderList(newOrderList);
      putOrderMutate({
        orderId: newOrderList[index].id,
        body: newOrderList[index],
      });
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
          onBlur={() => makeOrder(i)}
          setValue={setOrder(i)}
          setIschecked={setChecked(i)}
          ischecked={order.isClicked}
          placeholder={`항목을 추가해요\n설명은 안쓰셔도 돼요`}
        />
      ))}
    </FlexBox>
  );
}
