import { useGetRelation } from "@/hooks/query/relation";
import ButtonBar from "@modules/components/bars/ButtonBar";
import TextButton from "@modules/components/button/TextButton";
import Checkbox from "@modules/components/selections/Checkbox";
import FlexBox from "@modules/layout/FlexBox";
import GridBox from "@modules/layout/GridBox";
import TopTitle from "@modules/layout/TopTitle";

export default function MyPageAuthorithy() {
  const { relations } = useGetRelation();
  return (
    <FlexBox direction="col">
      <TopTitle title="관리자 권한 설정" />
      <FlexBox direction="col" className="p-4 w-full items-start gap-8">
        <FlexBox direction="col" className="w-full items-start gap-3">
          <div className="B3-medium">현재 관리자</div>
          <GridBox className="w-full gap-2">
            {relations?.map(relation => (
              <FlexBox
                key={relation.id}
                direction="col"
                className="bg-Black text-White rounded-xl p-5"
              >
                <span className="B4-medium">
                  {relation.id} | {relation.position}
                </span>
              </FlexBox>
            ))}
          </GridBox>
        </FlexBox>
        <FlexBox direction="col" className="w-full items-start gap-3">
          <div className="B3-medium">관리자 추가</div>
          <FlexBox direction="col" className="w-full gap-2">
            {relations
              ?.filter(relation => relation.role === "STAFF")
              .map(relation => (
                <FlexBox
                  key={relation.id}
                  className="justify-between w-full rounded-lg border border-Gray3 px-4 py-3"
                >
                  <div className="text-Gray5 B4-medium">{relation.id}</div>
                  <Checkbox type="round" />
                </FlexBox>
              ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <ButtonBar button={<TextButton text="추가하기" size="full" inactive />} />
    </FlexBox>
  );
}
