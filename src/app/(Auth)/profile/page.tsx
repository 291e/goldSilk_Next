"use client";

import { useUserStore } from "@/shared/store/useUserStore";
import { Button } from "@/shared/ui/shadCn/button";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useUserStore();
  const router = useRouter();

  if (!user) return <p>Loading...</p>;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">프로필</h2>
      <p className="mb-4">안녕하세요, {user.username}님!</p>
      <Button onClick={handleLogout}>로그아웃</Button>
    </div>
  );
}
