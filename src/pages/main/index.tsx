import TabBarGage from "@modules/components/bars/TabBarGage";
import FlexBox from "@modules/layout/FlexBox";

export default function Home() {
  return (
    <FlexBox direction="col" className="min-h-full justify-between">
      <FlexBox direction="col" className="w-full py-4">
        main
      </FlexBox>
      <TabBarGage />
    </FlexBox>
  );
}
