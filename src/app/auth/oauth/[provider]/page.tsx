"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://goldsilk.net";

export default function OAuthCallbackPage({
  params,
}: {
  params: { provider: string };
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOAuthToken = async () => {
      if (!searchParams) {
        console.error("❌ Search parameters are missing.");
        setError("인증 정보가 없습니다.");
        setLoading(false);
        return;
      }

      const code = searchParams.get("code");
      if (!code) {
        console.error("❌ OAuth 인증 코드가 없습니다.");
        setError("인증 코드가 없습니다.");
        setLoading(false);
        return;
      }

      console.log(`✅ 인증 코드: ${code}`);

      try {
        const { data } = await axios.get(
          `${API_URL}/auth/oauth/${params.provider}?code=${code}`,
          { timeout: 10000 } // ✅ 10초 타임아웃 설정 (네트워크 지연 대비)
        );

        console.log("✅ OAuth 로그인 성공:", data);

        // ✅ 토큰 저장 (쿠키로 저장할 수도 있음)
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("refresh_token", data.refresh_token);

        // ✅ 로그인 상태 업데이트 후 페이지 이동
        router.replace("/profile");
      } catch (error: any) {
        console.error("🚨 OAuth 로그인 실패:", error);
        setError("로그인 처리 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchOAuthToken();
  }, [params.provider, searchParams, router]);

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
