"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const OAuthCallbackPage = ({ params }: { params: { provider: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { provider } = params;

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (!searchParams) {
        console.error("검색 매개변수가 없습니다.");
        router.push("/login");
        return;
      }
      const code = searchParams.get("code");
      if (!code) {
        console.error("OAuth 코드가 없습니다.");
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/${provider}/callback?code=${code}`,
          { withCredentials: true } // 쿠키 기반 인증을 위해 필요
        );

        if (response.data) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          router.push("/"); // 로그인 후 메인 페이지로 이동
        }
      } catch (error) {
        console.error("OAuth 로그인 실패:", error);
        router.push("/login");
      }
    };

    handleOAuthCallback();
  }, [provider, searchParams, router]);

  return <p>{provider} 로그인 처리 중...</p>;
};

export default OAuthCallbackPage;
