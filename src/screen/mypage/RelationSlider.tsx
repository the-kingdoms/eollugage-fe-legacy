import { Relation } from "@/apis/relation";
import Profile from "@modules/components/profile/Profile";
import FlexBox from "@modules/layout/FlexBox";
import Slider from "@modules/layout/Slider";

interface RelationSliderProps {
  currentRelation: Relation;
  relationList: Relation[];
  onClick?: (relation: Relation) => void;
}

export default function RelationSlider({
  currentRelation,
  relationList,
  onClick,
}: RelationSliderProps) {
  return (
    <Slider className="px-4 gap-2">
      {relationList.map(relation => (
        <button
          key={relation.member.id}
          className="shrink-0"
          type="button"
          onClick={() => onClick && onClick(relation)}
        >
          <FlexBox direction="col" className="gap-1">
            <Profile
              size="M1"
              name={relation.member.name}
              focus={relation.member.id === currentRelation.member?.id}
            />
            <div className="w-full text-center B5-medium text-Gray5">
              {relation.member.name.slice(0, 5)}
              {relation.id.length > 5 && "..."}
            </div>
          </FlexBox>
        </button>
      ))}
    </Slider>
  );
}
