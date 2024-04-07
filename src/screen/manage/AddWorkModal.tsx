import { addWorkModalAtom, selectedDateAtom } from "@/data/historyAtom";
import { usePostHistory } from "@/hooks/query/history";
import { useGetRelationList } from "@/hooks/query/relation";
import {
  checkIsValidPeriod,
  checkIsValidRest,
  checkIsValidTime,
} from "@/libs/timeValidation";
import TextButton from "@modules/components/button/TextButton";
import Dropdown from "@modules/components/selections/Dropdown";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Sheet from "react-modal-sheet";
import StaffTimeInput from "./StaffTimeInput";

export default function AddWorkModal() {
  const { mutate: postHistoryMutate } = usePostHistory();
  const { data: relationList } = useGetRelationList();
  const [selectedDate] = useAtom(selectedDateAtom);
  const [isModalOpen, setIsModalOpen] = useAtom(addWorkModalAtom);

  const [startWorkTime, setStartWorkTime] = useState<string>("0000");
  const [endWorkTime, setEndWorkTime] = useState<string>("1100");
  const [startRestTime, setStartRestTime] = useState<string>("0000");
  const [endRestTime, setEndRestTime] = useState<string>("1100");

  const [memberNameList, setMemberNameList] = useState<string[]>([]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const tempList = relationList?.map(
      relationInfo => relationInfo.member.name,
    );
    setMemberNameList(tempList ?? []);
  }, [relationList]);

  const getIdByName = (name: string) => {
    return relationList?.find(relationInfo => relationInfo.member.name === name)
      ?.member.id;
  };

  const [selectedMemberName, setSelectedMemberName] = useState<string>(
    memberNameList[0],
  );
  const onClickAddBtn = () => {
    if (
      !checkIsValidTime(startWorkTime) ||
      !checkIsValidTime(endWorkTime) ||
      !checkIsValidTime(startRestTime) ||
      !checkIsValidTime(endRestTime)
    ) {
      alert("00:00 ~ 23:59 사이 시간대만 입력할 수 있습니다.");
      return;
    }

    if (
      !checkIsValidPeriod(startWorkTime, endWorkTime) ||
      !checkIsValidPeriod(startRestTime, endRestTime)
    ) {
      alert("근무(휴식) 시작시간은 종료시간보다 선행되어야 합니다.");
      return;
    }

    if (
      !checkIsValidRest(startWorkTime, endWorkTime, startRestTime, endRestTime)
    ) {
      alert("휴식시간은 근무시간 내에서 지정할 수 있습니다.");
      return;
    }

    postHistoryMutate({
      body: {
        startTime: `${startWorkTime.substring(0, 2)}:${startWorkTime.substring(2)}`,
        endTime: `${endWorkTime.substring(0, 2)}:${endWorkTime.substring(2)}`,
        restStartTime: `${startRestTime.substring(0, 2)}:${startRestTime.substring(2)}`,
        restEndTime: `${endRestTime.substring(0, 2)}:${endRestTime.substring(2)}`,
        date: selectedDate.format("YYYY-MM-DD"),
      },
      memberId: String(getIdByName(selectedMemberName)),
    });
  };

  return (
    <Sheet isOpen={isModalOpen} onClose={closeModal} detent="content-height">
      <Sheet.Container
        style={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: 16,
        }}
      >
        <Sheet.Content>
          <div className="mb-6 text-Gray7 B1-medium">근무 추가</div>
          <Dropdown
            options={memberNameList}
            defaultValue={memberNameList[0]}
            onChange={setSelectedMemberName}
          />
          <FlexBox direction="col" className="gap-4 mb-8 mt-4">
            <StaffTimeInput
              title="근무 시간"
              startTime={startWorkTime}
              setStartTime={setStartWorkTime}
              endTime={endWorkTime}
              setEndTime={setEndWorkTime}
            />
            <StaffTimeInput
              title="휴게 시간"
              startTime={startRestTime}
              setStartTime={setStartRestTime}
              endTime={endRestTime}
              setEndTime={setEndRestTime}
            />
          </FlexBox>
          <TextButton size="full" text="추가하기" onClick={onClickAddBtn} />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onTap={closeModal}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      />
    </Sheet>
  );
}
