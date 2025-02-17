"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const SocialLoginPage = () => {
  const router = useRouter();
  const params = useParams<{ provider: string }>(); // ✅ `useParams()` 사용하여 provider 가져오기
  const provider = params?.provider;

  useEffect(() => {
    const fetchOAuthUrl = async () => {
      if (!provider) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/${provider}`
        );
        if (response.data.oauthUrl) {
          window.location.href = response.data.oauthUrl;
        }
      } catch (error) {
        console.error("OAuth URL 요청 실패:", error);
        router.push("/login"); // 실패 시 로그인 페이지로 이동
      }
    };

    fetchOAuthUrl();
  }, [provider, router]);

  return <p>{provider} 로그인 중...</p>;
};

export default SocialLoginPage;
