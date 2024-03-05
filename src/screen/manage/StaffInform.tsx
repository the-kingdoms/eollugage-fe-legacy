import ProfileDiscription from "@/assist/ProfileDiscription";
import RouterWrapper from "@/assist/RouterWrapper";
import FlexBox from "@modules/layout/FlexBox";
import { useRouter } from "next/router";

export default function StaffInform() {
  const profiles = [
    { name: "얼루가", position: "매니저", time: "00:00 - 00:00" },
    { name: "방기연", position: "매니저", time: "00:00 - 00:00" },
  ];

  const router = useRouter();

  return (
    <FlexBox direction="col" className="w-full px-2 items-start gap-4 px-4">
      <div className="B1-medium">매니저</div>
      <FlexBox direction="col" className="gap-2 w-full">
        {profiles.map((people, index) => (
          <RouterWrapper
            key={index}
            routerdest="/manage/staff"
            iconsz={32}
            type="profile"
          >
            <ProfileDiscription
              name={people.name}
              position={people.position}
              time={people.time}
            />
          </RouterWrapper>
        ))}{" "}
      </FlexBox>
      <div className="B1-medium">알바</div>
    </FlexBox>
  );
}
