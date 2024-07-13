const copy = (text: string, onSuccess?: () => void) => {
  if (navigator.clipboard) {
    // (크롬 66버전 이상일때만 사용 가능)
    navigator.clipboard
      .writeText(text)
      .then(onSuccess)
      .catch(error => console.log("링크를 복사하는데 실패했습니다: ", error));
  } else {
    if (!document.queryCommandSupported("copy")) {
      console.log("복사하기가 지원되지 않는 브라우저입니다.");
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
};

export const copyLink = (inviteId: string, onSuccess?: () => void) => {
  const link = `${window.location.origin}/?id=${inviteId}`;
  copy(link, onSuccess);
};
