"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/shared/store/useUserStore";
import { useRouter } from "next/navigation";
import { Input } from "@/shared/ui/shadCn/input";
import { Button } from "@/shared/ui/shadCn/button";
import { Label } from "@/shared/ui/shadCn/label";
import { Checkbox } from "@/shared/ui/shadCn/checkbox";
import Link from "next/link";
import { AuthCard } from "@/widgets/Auth/AuthCard";
import { Alert, AlertTitle, AlertDescription } from "@/shared/ui";
import SocialLoginButtons from "@/entities/auth/ui/SocialLogin";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ 로컬 스토리지에서 저장된 이메일 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // ✅ 로그인 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setErrorField(null);

    // ✅ 유효성 검사 추가
    if (!email.trim()) {
      setError("이메일을 입력해주세요.");
      setErrorField("email");
      return;
    }
    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      setErrorField("password");
      return;
    }

    setLoading(true);

    try {
      await login(email, password);

      // ✅ 로그인 성공 시, 이메일 저장 여부 확인
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      // ✅ 로그인 성공 후 프로필 페이지 이동
      router.push("/profile");
    } catch (err: any) {
      setError(err); // ✅ login 함수에서 throw된 에러 메시지 표시

      // ✅ API 응답 메시지에 따라 특정 필드 강조
      if (err.includes("이메일")) setErrorField("email");
      else if (err.includes("비밀번호")) setErrorField("password");
      else setErrorField(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="로그인"
      footer={
        <div className="w-full flex flex-col items-start gap-4">
          <p className="text-sm">
            계정이 없으신가요?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              회원가입
            </Link>
          </p>

          <div className="w-full h-[1px] bg-[#353535] rounded-full" />

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col text-left">
              <span className="font-semibold text-sm">SNS 간편로그인</span>
              <span className="text-xs">간편하게 로그인 해보세요.</span>
            </div>
            <SocialLoginButtons />
          </div>
        </div>
      }
    >
      {/* ✅ 로그인 실패 시 Alert 메시지 표시 */}
      {error && (
        <Alert className="bg-red-100 border-red-400 text-red-800 p-3 rounded-md">
          <AlertTitle>로그인 실패</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={errorField === "email" ? "border-red-500" : ""}
          />
        </div>

        <div>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={errorField === "password" ? "border-red-500" : ""}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="flex items-center space-x-2">
            <Checkbox
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <span className="text-sm">아이디 저장</span>
          </Label>

          <Link
            href="/password/forgot"
            className="text-sm text-blue-600 hover:underline"
          >
            비밀번호 찾기
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </Button>
      </form>
    </AuthCard>
  );
}
