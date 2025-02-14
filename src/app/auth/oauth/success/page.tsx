"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams?.get("access_token");
    const refreshToken = searchParams?.get("refresh_token");

    if (accessToken && refreshToken) {
      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("refresh_token", refreshToken);

      // ✅ 로그인 후 프로필 페이지로 리디렉트
      router.replace("/profile");
    } else {
      console.error("🚨 OAuth 토큰이 없습니다.");
      router.replace("/auth/login"); // 로그인 페이지로 리디렉트
    }
  }, [router, searchParams]);

  return <p>🔄 로그인 처리 중...</p>;
}
