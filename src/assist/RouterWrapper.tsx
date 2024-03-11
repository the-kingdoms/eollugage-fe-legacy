import FlexBox from "@modules/layout/FlexBox";
import Icon from "@modules/layout/Icon";
import { useRouter } from "next/router";

interface RouterWrapperProps {
  children: React.ReactNode;
  routerdest: string;
  type: "ceo" | "profile";
}

const style = {
  ceo: "pl-4 pr-2.5 rounded-lg border-neutral-500 justify-between",
  profile: "border-bgray-200 pl-3 rounded-2xl",
};

const iconsz = {
  ceo: 24,
  profile: 32,
};

export default function RouterWrapper({
  children,
  routerdest,
  type,
}: RouterWrapperProps) {
  const router = useRouter();
  return (
    <button onClick={() => router.push(routerdest)} className="w-full">
      <FlexBox direction="row" className={`py-3 border ${style[type]}`}>
        {children}
        <Icon src={"/icon/direction/right.svg"} sz={iconsz[type]} />
      </FlexBox>
    </button>
  );
}
