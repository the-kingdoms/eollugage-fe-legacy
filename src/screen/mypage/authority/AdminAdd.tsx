import { Relation } from "@/apis/relation";
import Checkbox from "@modules/components/selections/Checkbox";
import FlexBox from "@modules/layout/FlexBox";

interface AdminAddProps {
  relation: Relation;
  checkedEmployees: Relation[];
  setCheckedEmployees: React.Dispatch<React.SetStateAction<Relation[]>>;
}
export default function AdminAdd({
  relation,
  checkedEmployees,
  setCheckedEmployees,
}: AdminAddProps) {
  const handleCheckboxChange = (employee: Relation) => () => {
    const index = checkedEmployees.findIndex(
      checkedEmployee => checkedEmployee.member.id === employee.member.id,
    );
    if (index !== -1) {
      setCheckedEmployees([]);
    } else {
      setCheckedEmployees(current => [...current, employee]);
    }
  };
  return (
    <FlexBox className="justify-between w-full rounded-lg border border-Gray3 px-4 py-3">
      <div className="text-Gray5 B4-medium">{relation.member.name}</div>
      <Checkbox
        type="round"
        checked={checkedEmployees.some(
          checkedEmployee => checkedEmployee.member.id === relation.member.id,
        )}
        onChange={handleCheckboxChange(relation)}
      />
    </FlexBox>
  );
}
