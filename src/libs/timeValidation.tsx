// 00:00 ~ 23:59 사이의 시간만 return true
export function checkIsValidTime(time: string) {
  if (Number(time) > 2359) return false;
  if (Number(time) < 0) return false;
  return true;
}
