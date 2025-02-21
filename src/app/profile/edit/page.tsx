"use client";

import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

export default function ProfileEditPage() {
  const router = useRouter();

  return (
    <div>
      <Button className="mt-4" onClick={() => router.push("/")}>
        홈으로 돌아가기
      </Button>
    </div>
  );
}
