"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams?.get("token");
    const refreshToken = searchParams?.get("refresh_token");

    if (!accessToken || !refreshToken) {
      console.error("토큰이 없습니다.");
      router.push("/login");
      return;
    }

    // ✅ 토큰 저장 (localStorage 또는 쿠키 사용 가능)
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    // ✅ 로그인 후 메인 페이지로 이동
    router.push("/");
  }, [router, searchParams]);

  return <p>로그인 처리 중...</p>;
}
