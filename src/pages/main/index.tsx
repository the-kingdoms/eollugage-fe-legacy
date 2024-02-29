import Notice from "@/screen/main/Notice";
import WorkInfo from "@/screen/main/WorkInfo";
import TabBarGage from "@modules/components/bars/TabBarGage";
import TextCheckField from "@modules/components/textfields/TextCheckField";
import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import { Dispatch, SetStateAction, useState } from "react";

export default function Home() {
  const [notice, setNotice] = useState<string>("");
  const [orderList, setOrderList] = useState<string[]>([]);
  const addOrder = () => {
    setOrderList([...orderList, ""]);
  };
  function setOrder(index: number): Dispatch<SetStateAction<string>> {
    return value => {
      const newOrderList = [...orderList];
      newOrderList[index] = value.toString();
      setOrderList(newOrderList);
    };
  }
  return (
    <FlexBox direction="col" className="w-full h-full justify-between">
      <FlexBox direction="col" className="w-full p-4 gap-8">
        <FlexBox direction="col" className="w-full gap-4 items-start">
          <div className="H5-bold">관리자 공지</div>
          <Notice
            value={notice}
            setValue={setNotice}
            placeholder="눌러서 추가해보세요"
          />
        </FlexBox>

        <FlexBox direction="col" className="w-full gap-4 items-start">
          <div className="H5-bold">금일의 근무</div>
          <WorkInfo name="김민수" position="팀장" time="09:00 ~ 18:00" />
          <WorkInfo name="이민지" position="팀원" time="09:00 ~ 18:00" />
        </FlexBox>

        <FlexBox direction="col" className="w-full gap-4">
          <FlexBox direction="row" className="w-full justify-between">
            <div className="H5-bold">발주 보드</div>
            <Icon
              src="/icon/control/plus_gray.svg"
              sz={32}
              onClick={addOrder}
            />
          </FlexBox>
          {orderList.map((order, i) => (
            <TextCheckField
              key={i}
              value={order}
              setValue={setOrder(i)}
              placeholder={`항목을 추가해요\n설명은 안쓰셔도 돼요`}
            />
          ))}
        </FlexBox>
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
