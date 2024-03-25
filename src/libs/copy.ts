export default function copy(
  text: string,
  onSuccess?: () => void,
  onError?: (err: Error) => void,
) {
  if (navigator.clipboard) {
    // (크롬 66버전 이상일때만 사용 가능)
    navigator.clipboard.writeText(text).then(onSuccess).catch(onError);
  } else {
    if (!document.queryCommandSupported("copy")) {
      onError && onError(new Error("복사하기가 지원되지 않는 브라우저입니다."));
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.position = "fixed";

    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    onSuccess && onSuccess();
  }
}
