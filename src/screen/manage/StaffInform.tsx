import ApprovalProfile from "@/assist/ApprovalProfile";
import FlexBox from "@modules/layout/FlexBox";

export default function StaffInform() {
  const profiles = [
    { name: "얼루가", position: "매니저", time: "00:00 - 00:00" },
    { name: "방기연", position: "매니저", time: "00:00 - 00:00" },
  ];

  return (
    <FlexBox direction="col" className="w-full px-4 items-start gap-4">
      <div className="B1-medium">매니저</div>
      <FlexBox direction="col" className="gap-2 w-full">
        {profiles.map((people, index) => (
          <div
            key={index}
            className="w-full border border-Gray2 py-3 pl-3 rounded-2xl"
          >
            <ApprovalProfile
              name={people.name}
              position={people.position}
              time={people.time}
            />
          </div>
        ))}{" "}
      </FlexBox>
      <div className="B1-medium">알바</div>
    </FlexBox>
  );
}
