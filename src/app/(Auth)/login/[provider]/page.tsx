import { Suspense } from "react";
import SocialLoginPage from "./SocialLoginPage";

export default function OAuthLoginPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <SocialLoginPage />
    </Suspense>
  );
}
