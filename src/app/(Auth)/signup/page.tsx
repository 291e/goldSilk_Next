import { Suspense } from "react";
import RegisterForm from "@/features/auth/ui/RegisterForm";

export default function SignupPage() {
  return (
    <Suspense fallback={<p>회원가입 페이지 로딩 중...</p>}>
      <RegisterForm />
    </Suspense>
  );
}
