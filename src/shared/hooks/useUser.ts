import { useUserStore } from "@/shared/store/useUserStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useUser() {
  const { user, isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // ✅ 로그인 안된 경우 로그인 페이지로 리디렉트
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return { isAuthenticated, user };
}
