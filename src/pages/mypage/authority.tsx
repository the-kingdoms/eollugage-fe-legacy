import { useState } from "react";
import {
  useGetRelationList,
  usePostRelationAdmin,
} from "@/hooks/query/relation";
import ButtonBar from "@modules/components/bars/ButtonBar";
import TextButton from "@modules/components/button/TextButton";
import Checkbox from "@modules/components/selections/Checkbox";
import FlexBox from "@modules/layout/FlexBox";
import GridBox from "@modules/layout/GridBox";
import TopTitle from "@modules/layout/TopTitle";
import { Relation } from "@/apis/relation";

export default function MyPageAuthorithy() {
  const { relations } = useGetRelationList();
  const { postRelationAdminMutate } = usePostRelationAdmin();
  const [checkedEmployees, setCheckedEmployees] = useState<Relation[]>([]);

  const handleCheckboxChange =
    (employee: Relation) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const index = checkedEmployees.findIndex(
        checkedEmployee => checkedEmployee.member.id === employee.member.id,
      );
      if (index !== -1) {
        setCheckedEmployees([]);
      } else {
        setCheckedEmployees(current => [...current, employee]);
      }
    };

  const addNewAdmin = () => {
    checkedEmployees.forEach(item => {
      item.role = "MANAGER";
      postRelationAdminMutate(item?.member.id, item);
    });
  };
  return (
    <FlexBox direction="col">
      <TopTitle title="관리자 권한 설정" />
      <FlexBox direction="col" className="p-4 w-full items-start gap-8">
        <FlexBox direction="col" className="w-full items-start gap-3">
          <div className="B3-medium">현재 관리자</div>
          <GridBox className="w-full gap-2">
            {relations
              ?.filter(
                relation =>
                  relation.role === "MANAGER" || relation.role === "OWNER",
              )
              .map(relation => (
                <FlexBox
                  key={relation.id}
                  direction="col"
                  className="bg-Black text-White rounded-xl p-5"
                >
                  <span className="B4-medium">
                    {relation.member.name} | {relation.position}
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
                  <div className="text-Gray5 B4-medium">
                    {relation.member.name}
                  </div>
                  <Checkbox
                    type="round"
                    checked={checkedEmployees.some(
                      checkedEmployee =>
                        checkedEmployee.member.id === relation.member.id,
                    )}
                    onChange={handleCheckboxChange(relation)}
                  />
                </FlexBox>
              ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <ButtonBar
        button={
          <TextButton
            text="추가하기"
            size="full"
            onClick={addNewAdmin}
            inactive={checkedEmployees.length === 0}
          />
        }
      />
    </FlexBox>
  );
}
