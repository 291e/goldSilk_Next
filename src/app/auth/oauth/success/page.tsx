"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // ✅ URL에서 직접 파라미터 가져오기
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("refresh_token", refreshToken);

      // ✅ 로그인 후 프로필 페이지로 리디렉트
      router.replace("/profile");
    } else {
      console.error("🚨 OAuth 토큰이 없습니다.");
      router.replace("/auth/login"); // 로그인 페이지로 리디렉트
    }
  }, [router]);

  return <p>🔄 로그인 처리 중...</p>;
}
