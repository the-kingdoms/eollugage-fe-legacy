import FlexBox from "@modules/layout/FlexBox";
import Sheet from "react-modal-sheet";
import StaffTimeInput from "./StaffTimeInput";
import TextButton from "@modules/components/button/TextButton";
import Dropdown from "@modules/components/selections/Dropdown";
import { usePostHistory } from "@/hooks/query/history";
import { useState } from "react";
import { checkIsValidTime } from "@/libs/timeValidation";

interface AddWorkModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddWorkModal({
  isModalOpen,
  setIsModalOpen,
}: AddWorkModalProps) {
  const { postHistory, isPending } = usePostHistory();
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [startWorkTime, setStartWorkTime] = useState<string>("0000");
  const [endWorkTime, setEndWorkTime] = useState<string>("1100");
  const [startRestTime, setStartRestTime] = useState<string>("0000");
  const [endRestTime, setEndRestTime] = useState<string>("1100");
  const options = ["홍길동", "홍길동", "홍길동"];

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

    postHistory({
      startTime: `${startWorkTime.substring(0, 2)}:${startWorkTime.substring(2)}`,
      endTime: `${endWorkTime.substring(0, 2)}:${endWorkTime.substring(2)}`,
      restStartTime: `${startRestTime.substring(0, 2)}:${startRestTime.substring(2)}`,
      restEndTime: `${endRestTime.substring(0, 2)}:${endRestTime.substring(2)}`,
      status: "approve",
      date: "2024-03-14",
    });
    // closeModal();
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
          <Dropdown options={options} defaultValue={options[0]} />
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
