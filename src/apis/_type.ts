type StatusType = "approved" | "denied" | null;
type DateType =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
type ProviderType = "KAKAO" | "GOOGLE" | "APPLE";
type RoleType = "ADMIN" | "USER";

export type { StatusType, DateType, ProviderType, RoleType };
