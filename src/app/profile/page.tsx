"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/shared/store/useUserStore";
import { useRouter } from "next/navigation";
import { fetchRecentOrderSummary } from "@/shared/api/orders";
import { Button } from "@/shared/ui/shadCn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/shadCn/card";
import Link from "next/link";

interface OrderSummary {
  total_orders: number;
  completed_orders: number;
  shipping_orders: number;
  delivered_orders: number;
  pending_orders: number;
  canceled_orders: number;
  returned_orders: number;
}

export default function ProfilePage() {
  const { user, logout } = useUserStore();
  const router = useRouter();
  const [summary, setSummary] = useState<OrderSummary | null>(null);

  useEffect(() => {
    if (user?.user_id) {
      console.log("📢 Fetching recent order summary for user:", user.user_id);

      fetchRecentOrderSummary(user.user_id) // ✅ userId를 전달하도록 수정
        .then((data) => {
          setSummary(data);
        })
        .catch((error) => {});
    }
  }, [user?.user_id]); // ✅ user_id가 변경될 때마다 실행

  if (!user) return <p>Loading...</p>;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="mx-auto mt-10 p-6 flex flex-col gap-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">My Page</h2>
      <p className=" border-y py-4 text-center text-sm md:text-base">
        저희 쇼핑몰을 이용해주셔서 감사합니다. {user.username}님!
      </p>

      {/* 최근 3개월 주문 & 배송 현황 */}
      <div className=" p-4 rounded-md mb-6">
        <h3 className="text-lg font-semibold mb-3 text-center">
          최근 3개월 주문 현황
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center text-sm md:text-base">
          {[
            { title: "총 주문", value: summary?.total_orders || 0 },
            { title: "배송 준비", value: summary?.pending_orders || 0 },
            { title: "배송 중", value: summary?.shipping_orders || 0 },
            { title: "배송 완료", value: summary?.delivered_orders || 0 },
            { title: "취소", value: summary?.canceled_orders || 0 },
            { title: "반품", value: summary?.returned_orders || 0 },
          ].map((item, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <p className="text-gray-600">{item.title}</p>
              <p className="text-sm md:text-xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 프로필 카드 섹션 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          {
            href: "/order",
            title: "📦 주문 내역 조회",
            desc: "내 주문 내역을 확인하세요.",
          },
          {
            href: "/profile/edit",
            title: "🔧 회원 정보 수정",
            desc: "개인 정보를 업데이트하세요.",
          },
          {
            href: "/wish",
            title: "❤️ 좋아요 목록",
            desc: "찜한 상품을 확인하세요.",
          },
          {
            href: "https://open.kakao.com/o/s5zVFwEg",
            title: "📝 문의하기",
            desc: "궁금한 점을 문의하세요.",
          },
        ].map((item, index) => (
          <Link key={index} href={item.href}>
            <Card className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-sm">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-2 text-xs md:text-sm">
                {item.desc}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Button
        className="mt-6 max-w-24 flex justify-center mx-auto"
        onClick={handleLogout}
      >
        로그아웃
      </Button>
    </div>
  );
}
