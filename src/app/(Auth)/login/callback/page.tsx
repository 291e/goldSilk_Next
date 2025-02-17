import { Suspense } from "react";
import OAuthCallbackComponent from "./OAuthCallbackComponent";

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<p>로그인 처리 중...</p>}>
      <OAuthCallbackComponent />
    </Suspense>
  );
}
