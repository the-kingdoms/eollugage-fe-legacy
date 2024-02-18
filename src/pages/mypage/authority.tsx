import ButtonBar from "@modules/components/bars/ButtonBar";
import TextButton from "@modules/components/button/TextButton";
import Checkbox from "@modules/components/selections/Checkbox";
import FlexBox from "@modules/layout/FlexBox";
import GridBox from "@modules/layout/GridBox";
import TopTitle from "@modules/layout/TopTitle";

export default function MyPageAuthorithy() {
  return (
    <FlexBox
      direction="col"
      className="min-h-screen items-start justify-between"
    >
      <div className="w-full">
        <TopTitle title="관리자 권한 설정" />
        <FlexBox direction="col" className="px-4 w-full items-start mt-2.5">
          <FlexBox direction="col" className="w-full items-start gap-3">
            <div className="B3-medium">현재 관리자</div>
            <GridBox className="w-full gap-2 mb-10">
              <div className="bg-Black text-White rounded-xl p-5 text-center">
                고승환 | 사장
              </div>
              <div className="bg-Black text-White rounded-xl p-5 text-center">
                고승환 | 사장
              </div>
              <div className="bg-Black text-White rounded-xl p-5 text-center">
                고승환 | 사장
              </div>
            </GridBox>
          </FlexBox>
          <FlexBox direction="col" className="w-full items-start gap-3">
            <div className="B3-medium">관리자 추가</div>
            <FlexBox direction="col" className="w-full gap-2">
              <FlexBox className="justify-between w-full rounded-lg border border-Gray3 px-4 py-3">
                <div className="text-Gray5 B4-medium">얼루가</div>
                <Checkbox type="round" />
              </FlexBox>
              <FlexBox className="justify-between w-full rounded-lg border border-Gray3 px-4 py-3">
                <div className="text-Gray5 B4-medium">얼루가</div>
                <Checkbox type="round" />
              </FlexBox>
              <FlexBox className="justify-between w-full rounded-lg border border-Gray3 px-4 py-3">
                <div className="text-Gray5 B4-medium">얼루가</div>
                <Checkbox type="round" />
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </div>
      <ButtonBar button={<TextButton text="추가하기" size="full" inactive />} />
    </FlexBox>
  );
}
