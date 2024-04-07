import { Relation } from "@/apis/relation";
import ProfileDiscription from "@/assist/ProfileDiscription";
import RouterWrapper from "@/assist/RouterWrapper";
import { useGetRelationList } from "@/hooks/query/relation";
import FlexBox from "@modules/layout/FlexBox";
import { useEffect, useState } from "react";

export default function StaffInform() {
  const { data: relations } = useGetRelationList();
  const [relationDict, setRelationDict] = useState<Record<string, Relation[]>>(
    {},
  );

  useEffect(() => {
    if (relations && relations.length > 0) {
      const updatedDict = relations.reduce(
        (dict: Record<string, Relation[]>, relates: Relation) => {
          if (dict[relates.position]) dict[relates.position].push(relates);
          // eslint-disable-next-line no-param-reassign
          else dict[relates.position] = [relates];
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
      {Object.entries(relationDict).map(([position, relates], dictIndex) => (
        <FlexBox
          key={dictIndex}
          direction="col"
          className="items-start w-full gap-4 px-4"
        >
          <div className="B1-medium">{position}</div>
          <FlexBox direction="col" className="gap-2 w-full">
            {relates.map((relate, relateIndex) => (
              <RouterWrapper
                key={relateIndex}
                routerdest="/manage/staff"
                type="profile"
              >
                <ProfileDiscription
                  name={relate.member.name}
                  position={relate.position}
                  phone={relate.member.phone}
                />
              </RouterWrapper>
            ))}
          </FlexBox>
        </FlexBox>
      ))}
    </FlexBox>
  );
}

// 핸드폰 임시 수정
