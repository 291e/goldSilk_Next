"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://goldsilk.net";

export default function OAuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams(); // ✅ useParams() 사용하여 provider 값 가져오기
  const provider = params?.provider as string | undefined;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    if (!searchParams) {
      console.error("❌ Search parameters are missing.");
      setError("인증 정보가 없습니다.");
      setLoading(false);
      return;
    }

    const urlCode = searchParams.get("code");
    if (urlCode) {
      setCode(urlCode);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchOAuthToken = async () => {
      if (!code) {
        console.error("❌ OAuth 인증 코드가 없습니다.");
        setError("인증 코드가 없습니다.");
        setLoading(false);
        return;
      }

      if (!provider) {
        console.error("❌ 지원되지 않는 인증 제공자.");
        setError("유효하지 않은 인증 제공자입니다.");
        setLoading(false);
        return;
      }

      console.log(`✅ 인증 코드: ${code}`);
      console.log(`✅ 인증 제공자: ${provider}`);

      try {
        const { data } = await axios.get(
          `${API_URL}/test/auth/oauth/${provider}?code=${code}`,
          { timeout: 10000 } // ✅ 10초 타임아웃 설정
        );

        console.log("✅ OAuth 로그인 성공:", data);

        // ✅ 토큰 저장
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("refresh_token", data.refresh_token);

        // ✅ 로그인 후 리디렉트
        router.replace("/profile");
      } catch (error: any) {
        console.error("🚨 OAuth 로그인 실패:", error);
        setError("로그인 처리 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (code && provider) {
      fetchOAuthToken();
    }
  }, [code, provider, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <p>🔄 로그인 처리 중...</p>
      ) : error ? (
        <p className="text-red-500">🚨 {error}</p>
      ) : (
        <p>✅ 로그인 성공! 리디렉트 중...</p>
      )}
    </div>
  );
}
