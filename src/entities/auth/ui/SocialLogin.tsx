"use client";

import React from "react";
import { Button } from "@/shared/ui";
import { FcGoogle } from "react-icons/fc";
import { SiNaver, SiKakaotalk } from "react-icons/si";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://goldsilk.net";

export default function SocialLoginButtons() {
  // ✅ OAuth 로그인 처리 함수
  const handleSocialLogin = async (provider: "naver" | "kakao" | "google") => {
    try {
      const { data } = await axios.get(`${API_URL}/auth/oauth/${provider}`);
      if (data.oauthUrl) {
        window.location.href = data.oauthUrl; // ✅ OAuth 인증 URL로 이동
      } else {
        console.error("OAuth URL을 가져오지 못했습니다.");
      }
    } catch (error) {
      console.error("소셜 로그인 요청 실패:", error);
    }
  };

  return (
    <div className="flex gap-3">
      <Button
        className="flex flex-col items-center justify-center gap-0 bg-green-500 text-white size-11 pb-0.5 hover:bg-green-600 text-xs"
        onClick={() => handleSocialLogin("naver")}
      >
        <SiNaver size={20} />
        네이버
      </Button>
      <Button
        className="flex flex-col items-center justify-center gap-0 bg-yellow-200 text-black size-11 pb-0.5 hover:bg-yellow-300 text-xs"
        onClick={() => handleSocialLogin("kakao")}
      >
        <SiKakaotalk size={20} />
        카카오
      </Button>
      <Button
        className="flex flex-col items-center justify-center gap-0 bg-white text-black border size-11 pb-0.5 hover:bg-gray-100 text-xs"
        onClick={() => handleSocialLogin("google")}
      >
        <FcGoogle size={20} />
        구글
      </Button>
    </div>
  );
}
