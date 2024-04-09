import { Relation } from "@/apis/relation";
import {
  useGetRelationList,
  usePostRelationAdmin,
} from "@/hooks/query/relation";
import AdminAdd from "@/screen/mypage/authority/AdminAdd";
import AdminInfoCard from "@/screen/mypage/authority/AdminInfoCard";
import ButtonBar from "@modules/components/bars/ButtonBar";
import TextButton from "@modules/components/button/TextButton";
import FlexBox from "@modules/layout/FlexBox";
import GridBox from "@modules/layout/GridBox";
import TopTitle from "@modules/layout/TopTitle";
import { useState } from "react";

export default function MyPageAuthorithy() {
  const { data: relations } = useGetRelationList();
  const { mutate: postRelationAdminMutate } = usePostRelationAdmin();
  const [checkedEmployees, setCheckedEmployees] = useState<Relation[]>([]);

  const addNewAdmin = () => {
    checkedEmployees.forEach(item => {
      postRelationAdminMutate({
        memberId: item?.member.id,
        body: { ...item, role: "MANAGER" },
      });
    });
  };

  return (
    <FlexBox direction="col">
      <FlexBox direction="col" className="px-4 w-full items-start gap-8">
        <TopTitle title="관리자 권한 설정" />
        <FlexBox direction="col" className="w-full items-start gap-3">
          <div className="B3-medium">현재 관리자</div>
          <GridBox className="w-full gap-2">
            {relations
              ?.filter(
                relation =>
                  relation.role === "MANAGER" || relation.role === "OWNER",
              )
              .map(relation => (
                <AdminInfoCard key={relation.id} relation={relation} />
              ))}
          </GridBox>
        </FlexBox>
        <FlexBox direction="col" className="w-full items-start gap-3">
          <div className="B3-medium">관리자 추가</div>
          <FlexBox direction="col" className="w-full gap-2">
            {relations
              ?.filter(relation => relation.role === "STAFF")
              .map(relation => (
                <AdminAdd
                  key={relation.id}
                  relation={relation}
                  checkedEmployees={checkedEmployees}
                  setCheckedEmployees={setCheckedEmployees}
                />
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
