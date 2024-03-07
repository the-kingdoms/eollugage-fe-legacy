import FlexBox from "@modules/layout/FlexBox";
import Sheet from "react-modal-sheet";
import StaffTimeInput from "./StaffTimeInput";
import TextButton from "@modules/components/button/TextButton";
import Dropdown from "@modules/components/selections/Dropdown";

interface AddWorkModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddWorkModal({
  isModalOpen,
  setIsModalOpen,
}: AddWorkModalProps) {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const startTime = "0000";
  const endTime = "1111";
  const options = ["홍길동", "홍길동", "홍길동"];

  const onClickAddBtn = () => {
    closeModal();
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
            <StaffTimeInput title="근무 시간" start={startTime} end={endTime} />
            <StaffTimeInput title="휴게 시간" start={startTime} end={endTime} />
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
