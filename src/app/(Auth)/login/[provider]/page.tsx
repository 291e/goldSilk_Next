"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import axios from "axios";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const params = useParams<{ provider: string }>(); // ✅ provider 값 가져오기
  const provider = params?.provider; // `undefined`가 아닐 때만 사용
  const searchParams = useSearchParams();
  const code = searchParams?.get("code");

  useEffect(() => {
    if (!provider) {
      console.error("OAuth 콜백 오류: provider 값이 없습니다.");
      router.push("/login");
      return;
    }

    if (!code) {
      console.error("OAuth 콜백 오류: 인증 코드가 없습니다.");
      router.push("/login");
      return;
    }

    const handleOAuthCallback = async () => {
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
  }, [provider, code, router]);

  return (
    <p>{provider ? `${provider} 로그인 처리 중...` : "로그인 처리 중..."}</p>
  );
}
