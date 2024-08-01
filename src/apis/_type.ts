type StatusType = "APPROVED" | "DISAPPROVED" | "DECLINED";
type DayType =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
type ProviderType = "KAKAO" | "GOOGLE" | "APPLE";
type RoleType = "OWNER" | "MANAGER" | "STAFF";

interface Store {
  storeId: string;
  name: string;
}

interface AbstractMember {
  id: string | null;
  name: string | null;
  phone: string | null;
  providerType: ProviderType | null;
  storeList: Store[] | null;
}

export type { StatusType, DayType, ProviderType, RoleType };
export type { Store, AbstractMember };
