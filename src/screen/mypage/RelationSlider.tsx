import { Relation } from "@/apis/relation";
import Profile from "@modules/components/profile/Profile";
import FlexBox from "@modules/layout/FlexBox";
import Slider from "@modules/layout/Slider";

interface RelationSliderProps {
  currentRelation: Relation;
  relationList: Relation[];
}

export default function RelationSlider({
  currentRelation,
  relationList,
}: RelationSliderProps) {
  return (
    <Slider className="px-4 gap-2">
      <button className="shrink-0" type="button" onClick={() => {}}>
        <FlexBox direction="col" className="gap-1">
          <Profile size="M1" name="hell" focus={false} />
          <div className="w-full text-center B5-medium text-Gray5">hello</div>
        </FlexBox>
      </button>
      <div className="shrink-0">
        <Profile size="M1" name="hell" />
      </div>
      <div className="shrink-0">
        <Profile size="M1" name="hell" />
      </div>
      <div className="shrink-0">
        <Profile size="M1" name="hell" />
      </div>
      <div className="shrink-0">
        <Profile size="M1" name="hell" />
      </div>
      <div className="shrink-0">
        <Profile size="M1" name="hell" />
      </div>
      <div className="shrink-0">
        <Profile size="M1" name="hell" />
      </div>
      <div className="shrink-0">
        <Profile size="M1" name="hell" />
      </div>
    </Slider>
  );
}
