import { Suspense } from "react";
import OAuthCallbackComponent from "./OAuthCallbackComponent";

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <OAuthCallbackComponent />
    </Suspense>
  );
}
