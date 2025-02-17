"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/shared/store/useUserStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/shared/ui/shadCn/input";
import { Button } from "@/shared/ui/shadCn/button";
import { Label } from "@/shared/ui/shadCn/label";
import Link from "next/link";
import { AuthCard } from "@/widgets/Auth/AuthCard";
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register } = useUserStore();

  const [socialProvider, setSocialProvider] = useState("");
  const [socialEmail, setSocialEmail] = useState("");
  const [socialId, setSocialId] = useState("");
  const [socialUsername, setSocialUsername] = useState("");

  // ✅ useEffect로 searchParams 값을 useState에 저장
  useEffect(() => {
    setSocialProvider(searchParams?.get("provider") || "");
    setSocialEmail(searchParams?.get("email") || "");
    setSocialId(searchParams?.get("social_id") || "");
    setSocialUsername(searchParams?.get("username") || "");
  }, [searchParams]);

  const [email, setEmail] = useState(socialEmail);
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState(socialUsername);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setErrorField(null);

    if (!username || !email || (!password && !socialProvider) || !phone) {
      setError("모든 필드를 입력해주세요.");
      setErrorField(
        !username
          ? "username"
          : !email
            ? "email"
            : !password && !socialProvider
              ? "password"
              : "phone"
      );
      return;
    }

    if (!socialProvider && password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      setErrorField("password");
      return;
    }

    setLoading(true);

    try {
      await register(
        username,
        email,
        password,
        phone,
        socialProvider,
        socialId
      );
      setSuccessMessage("회원가입 성공! 로그인 페이지로 이동합니다.");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        "회원가입에 실패했습니다. 다시 시도해주세요.";
      setError(errorMessage);

      if (errorMessage.includes("이메일")) setErrorField("email");
      else if (errorMessage.includes("전화번호")) setErrorField("phone");
      else if (errorMessage.includes("비밀번호")) setErrorField("password");
      else setErrorField(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="회원가입"
      footer={
        <p className="text-sm">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            로그인
          </Link>
        </p>
      }
    >
      {successMessage && (
        <Alert className="bg-green-100 border-green-400 text-green-800 p-3 rounded-md">
          <AlertTitle>회원가입 성공!</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username">사용자명</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={errorField === "username" ? "border-red-500" : ""}
          />
        </div>

        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            value={email}
            readOnly={!!socialProvider}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={errorField === "email" ? "border-red-500" : ""}
          />
        </div>

        {!socialProvider && (
          <div className="relative w-full">
            <Label htmlFor="password">비밀번호</Label>
            <div className="flex items-center w-full justify-between border-[1px] p-2 rounded-md">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={
                  errorField === "password"
                    ? "border-red-500"
                    : "outline-none w-full text-sm"
                }
              />
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 pr-2"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="phone">전화번호</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            required
            className={errorField === "phone" ? "border-red-500" : ""}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "회원가입 중..." : "회원가입"}
        </Button>
      </form>
    </AuthCard>
  );
}
