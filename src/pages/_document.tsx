import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, maximum-scale=1, width=device-width"
      />
      <link rel="icon" href="/logo/eollugage/logo.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/logo/eollugage/logo.png" />
      <link rel="shortcut icon" href="/logo/eollugage/logo.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://gage.eolluga.com" />
      <meta property="og:title" content="얼루가게" />
      <meta property="og:image" content="/logo/eollugage/logo.png" />
      <meta property="og:description" content="얼루가게" />
      <meta property="og:site_name" content="얼루가게" />
      <meta property="og:locale" content="ko_KR" />
      <title lang="ko">얼루가게</title>
      <script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
