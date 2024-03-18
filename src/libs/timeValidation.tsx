// 00:00 ~ 23:59 사이의 시간만 return true
export function checkIsValidTime(time: string) {
  if (Number(time) > 2359) return false;
  if (Number(time) < 0) return false;
  return true;
}

export function getTimeString(startTime: string, endTime: string) {
  let start = startTime;
  let end = endTime;
  if (startTime.length === 8) start = startTime.slice(0, 5);
  if (endTime.length === 8) end = endTime.slice(0, 5);

  return `${start} ~ ${end}`;
}
