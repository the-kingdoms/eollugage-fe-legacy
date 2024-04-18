export function getFcmTokenRN() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ReactNativeWebView } = window as any;
  if (ReactNativeWebView) {
    ReactNativeWebView.postMessage(JSON.stringify({ type: "getFcmToken" }));
  }
}

export function getPlatform() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ReactNativeWebView } = window as any;
  if (ReactNativeWebView) {
    ReactNativeWebView.postMessage(JSON.stringify({ type: "getPlatform" }));
  }
}

export function postAppleLogin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ReactNativeWebView } = window as any;
  if (ReactNativeWebView) {
    ReactNativeWebView.postMessage(JSON.stringify({ type: "postAppleLogin" }));
  }
}
