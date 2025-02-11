"use client";

import { useEffect } from "react";
import { useUserStore } from "@/shared/store/useUserStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // ✅ 앱이 실행될 때 로그인 상태 유지
  }, [fetchUser]);

  return <>{children}</>;
}
