import LoginButton from "@modules/components/button/LoginButton";
import FlexBox from "@modules/layout/FlexBox";

function AppleLoginButtonWrapper() {
  const appleLogin = () => {};
  return (
    <FlexBox className="px-4 w-full justify-center">
      <div className="w-full max-w-[360px]">
        <LoginButton type="apple" onClick={appleLogin} />
      </div>
    </FlexBox>
  );
}

export default AppleLoginButtonWrapper;
