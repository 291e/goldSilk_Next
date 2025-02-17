"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SocialLoginPage = ({ params }: { params: { provider: string } }) => {
  const router = useRouter();
  const { provider } = params;

  useEffect(() => {
    const fetchOAuthUrl = async () => {
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
