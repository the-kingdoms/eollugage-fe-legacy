import ProfileDiscription from "@/assist/ProfileDiscription";
import RouterWrapper from "@/assist/RouterWrapper";
import FlexBox from "@modules/layout/FlexBox";
import { useGetRelation } from "@/hooks/query/relation";
import { useEffect, useState } from "react";
import { Relation } from "@/apis/relation";

export default function StaffInform() {
  const { relations } = useGetRelation();
  const [relation, setRelation] = useState<Relation[]>([]);

  useEffect(() => {
    if (relations && relations.length > 0) {
      setRelation(relations);
    } else {
      setRelation([]);
    }
  }, [relations]);

  return (
    <FlexBox direction="col" className="w-full px-2 items-start gap-4 px-4">
      <div className="B1-medium">매니저</div>
      <FlexBox direction="col" className="gap-2 w-full">
        {relation.map((relate, index) => (
          <RouterWrapper key={index} routerdest="/manage/staff" type="profile">
            <ProfileDiscription
              name={"얼루가"}
              position={relate.position}
              time={"00:00 - 00:00"}
            />
          </RouterWrapper>
        ))}{" "}
      </FlexBox>
      <div className="B1-medium">알바</div>
    </FlexBox>
  );
}
