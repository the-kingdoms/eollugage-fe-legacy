import { Relation } from "@/apis/relation";
import { usePostRelationAdmin } from "@/hooks/query/relation";
import FlexBox from "@modules/layout/FlexBox";

interface AdminInfoCardProps {
  relation: Relation;
}

function AdminRemoveWapper({
  relation,
  children,
}: AdminInfoCardProps & { children: React.ReactNode }) {
  const { mutate: postRelationAdminMutate } = usePostRelationAdmin();
  const removeAdmin = () => {
    postRelationAdminMutate({
      memberId: relation.member.id,
      body: { ...relation, role: "STAFF" },
    });
  };
  return (
    <button type="button" onClick={removeAdmin}>
      {children}
    </button>
  );
}

function AdminInfoCardCore({ relation }: AdminInfoCardProps) {
  return (
    <FlexBox
      direction="col"
      className="bg-Black text-White rounded-xl p-5 relative"
    >
      <span className="B4-medium">
        {relation.member.name} | {relation.position}
      </span>
      {relation.role !== "OWNER" && (
        <AdminRemoveWapper relation={relation}>
          <FlexBox className="w-[20px] h-[20px] right-[-10px] top-[-10px] absolute bg-Gray3 rounded-full">
            <div className="w-2.5 h-[0px] left-[5px] absolute border border-Gray7" />
          </FlexBox>
        </AdminRemoveWapper>
      )}
    </FlexBox>
  );
}

export default function AdminInfoCard({ relation }: AdminInfoCardProps) {
  if (relation.role !== "OWNER")
    return (
      <AdminRemoveWapper relation={relation}>
        <AdminInfoCardCore relation={relation} />
      </AdminRemoveWapper>
    );

  return <AdminInfoCardCore relation={relation} />;
}
