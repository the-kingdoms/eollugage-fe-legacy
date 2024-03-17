type StatusType = "approve" | "disapprove" | "decline";
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

export type { StatusType, DayType, ProviderType, RoleType };
