"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function OAuthCallbackComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams?.get("code");

  // ✅ `provider` 값을 URL에서 직접 추출
  const provider =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").slice(-2, -1)[0]
      : "";

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (!code || !provider) {
        console.error("OAuth 코드 또는 provider가 없습니다.");
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/${provider}/callback?code=${code}`,
          { withCredentials: true }
        );

        if (response.data) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          router.push("/");
        }
      } catch (error) {
        console.error("OAuth 로그인 실패:", error);
        router.push("/login");
      }
    };

    handleOAuthCallback();
  }, [code, provider, router]);

  return <p>{provider} 로그인 처리 중...</p>;
}
