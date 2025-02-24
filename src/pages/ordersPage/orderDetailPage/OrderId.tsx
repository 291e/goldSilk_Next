"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchOrder } from "@/shared/api/orders";
import { OrderDetail } from "@/shared/types/orders";
import { Button } from "@/shared/ui/shadCn/button";

export default function OrderDetailPage() {
  const params = useParams() || {};
  const { orderId } = params as { orderId?: string };

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!orderId) return;

    const loadOrderDetail = async () => {
      try {
        const data = await fetchOrder(Number(orderId));
        setOrder(data);
      } catch (error) {
        console.error("🚨 주문 상세 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetail();
  }, [orderId]);

  if (loading) {
    return <p className="text-center">📦 주문 정보를 불러오는 중...</p>;
  }

  if (!order) {
    return (
      <p className="text-center text-red-500">
        ❌ 주문 정보를 찾을 수 없습니다.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📜 주문 상세 정보</h2>

      <div className="border rounded-lg shadow-sm p-4">
        <p>📌 주문 번호: {order.order_id}</p>
        <p>👤 수령인: {order.recipient_name}</p>
        <p>📞 연락처: {order.phone_number}</p>
        <p>📦 배송 주소: {order.shipping_address}</p>
        <p>💳 총 결제 금액: {order.total_amount.toLocaleString()} 원</p>
        <p>📆 주문 날짜: {new Date(order.created_at).toLocaleString()}</p>
        <p>🚚 주문 상태: {order.order_status}</p>
      </div>

      <h3 className="text-lg font-bold mt-6 mb-2">🛍 주문 상품 목록</h3>
      <div className="border rounded-lg shadow-sm p-4">
        {order.order_items.map((item) => (
          <div key={item.order_item_id} className="border-b py-2">
            <p>📦 상품명: {item.products.name}</p>
            <p>💰 가격: {item.price.toLocaleString()} 원</p>
            <p>📦 수량: {item.quantity} 개</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button variant="outline" onClick={() => router.push("/order")}>
          주문 목록으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
