"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/shared/store/useUserStore";

export default function OAuthCallbackComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const provider = searchParams?.get("provider") as
    | "naver"
    | "kakao"
    | "google"; // ✅ 수정: useSearchParams()로 provider 가져오기
  const token = searchParams?.get("token");
  const refreshToken = searchParams?.get("refresh_token");
  const socialLogin = useUserStore((state) => state.socialLogin);

  useEffect(() => {
    console.log("🔍 콜백 URL 파라미터 확인:", {
      provider,
      token,
      refreshToken,
    });

    if (!provider || !token || !refreshToken) {
      console.error("🚨 OAuth 콜백 오류: 필수 데이터 누락", {
        provider,
        token,
        refreshToken,
      });
      router.push("/login");
      return;
    }

    console.log(`✅ ${provider} 소셜 로그인 완료. 토큰 저장 중...`);

    // ✅ Zustand 상태 업데이트
    socialLogin(provider, token, refreshToken);

    router.push("/");
  }, [provider, token, refreshToken, router, socialLogin]);

  return <p>{provider} 로그인 처리 중...</p>;
}
