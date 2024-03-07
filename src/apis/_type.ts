type StatusType = "approve" | "disapprove" | "decline";
type DateType =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
type ProviderType = "KAKAO" | "GOOGLE" | "APPLE";
type RoleType = "owner" | "manager" | "staff";

export type { StatusType, DateType, ProviderType, RoleType };
