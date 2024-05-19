import { platformAtom } from "@/data/platform";
import { getAppleIdentifyToken } from "@/libs/reactNative/sender";
import LoginButton from "@modules/components/button/LoginButton";
import FlexBox from "@modules/layout/FlexBox";
import { useAtom } from "jotai";

function AppleLoginButtonWrapper() {
  const [platform] = useAtom(platformAtom);
  const appleLogin = () => {
    getAppleIdentifyToken();
  };
  return (
    <FlexBox className="px-4 w-full justify-center">
      {platform?.OS === "ios" && (
        <div className="w-full max-w-[360px]">
          <LoginButton type="apple" onClick={appleLogin} />
        </div>
      )}
    </FlexBox>
  );
}

export default AppleLoginButtonWrapper;
