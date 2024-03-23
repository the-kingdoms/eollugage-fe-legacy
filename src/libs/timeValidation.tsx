// ** (시작, 종료 시간 모두 24시간 형식이어야 함)

// 00:00 ~ 23:59 사이의 시간만 return true
export function checkIsValidTime(time: string) {
  if (Number(time) > 2359) return false;
  if (Number(time) < 0) return false;
  return true;
}

// 1. 시작시간 < 끝시간인지
// 2. 시작시간 !== 끝시간인지를 체크함
// 두 조건 모두 통과시 return true
export function checkIsValidPeriod(startTime: string, endTime: string) {
  if (
    Number(startTime) > Number(endTime) ||
    Number(endTime) - Number(startTime) <= 0
  )
    return false;
  return true;
}

// 1. 근무시작시간이 휴식시작시간보다 느린 경우
// 2. 근무종료시간이 휴식종료시간보다 빠른 경우
// 에는 return false. 나머지는 return true
export function checkIsValidRest(
  startWork: string,
  endWork: string,
  startRest: string,
  endRest: string,
) {
  if (Number(startWork) > Number(startRest)) return false;
  if (Number(endWork) < Number(endRest)) return false;
  return true;
}

export function getTimeString(startTime: string, endTime: string) {
  let start = startTime;
  let end = endTime;
  if (startTime.length === 8) start = startTime.slice(0, 5);
  if (endTime.length === 8) end = endTime.slice(0, 5);

  return `${start} ~ ${end}`;
}
