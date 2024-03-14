import ProfileDiscription from "@/assist/ProfileDiscription";
import RouterWrapper from "@/assist/RouterWrapper";
import FlexBox from "@modules/layout/FlexBox";
import { useGetRelation } from "@/hooks/query/relation";
import { useEffect, useState } from "react";
import { Relation } from "@/apis/relation";

export default function StaffInform() {
  const { relations } = useGetRelation();
  const [relationDict, setRelationDict] = useState<Record<string, Relation[]>>(
    {},
  );

  useEffect(() => {
    if (relations && relations.length > 0) {
      const updatedDict = relations.reduce(
        (dict: Record<string, Relation[]>, relates) => {
          dict[relates.position]
            ? dict[relates.position].push(relates)
            : (dict[relates.position] = [relates]);
          return dict;
        },
        {},
      );
      setRelationDict(updatedDict);
    } else {
      setRelationDict({});
    }
  }, [relations]);

  return (
    <FlexBox direction="col" className="w-full items-start gap-6">
      {Object.entries(relationDict).map(([position, relates], index) => (
        <FlexBox
          key={index}
          direction="col"
          className="items-start w-full gap-4"
        >
          <div className="B1-medium">{position}</div>
          <FlexBox direction="col" className="gap-2 w-full">
            {relates.map((relate, index) => (
              <RouterWrapper
                key={index}
                routerdest="/manage/staff"
                type="profile"
              >
                <ProfileDiscription
                  name={"얼루가"}
                  position={relate.position}
                  time={"00:00 - 00:00"}
                />
              </RouterWrapper>
            ))}{" "}
          </FlexBox>
        </FlexBox>
      ))}
    </FlexBox>
  );
}
