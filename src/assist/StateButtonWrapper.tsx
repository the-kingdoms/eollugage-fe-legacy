import StateButton from "@modules/components/button/StateButton";
import FlexBox from "@modules/layout/FlexBox";

interface StateButtonWrapperProps {
  children: React.ReactNode;
  buttonClick: () => void;
  buttonState: "approve" | "disapprove" | "decline";
}

export default function StateButtonWrapper({
  children,
  buttonClick,
  buttonState,
}: StateButtonWrapperProps) {
  return (
    <FlexBox direction="row" className="w-full justify-betwen">
      {children}
      <StateButton type={buttonState} onclick={buttonClick} />
    </FlexBox>
  );
}
