"use client";

import { useState } from "react";
import { useCart } from "@/shared/hooks/useCart";
import { useUserStore } from "@/shared/store/useUserStore";
import { Button } from "@/shared/ui/shadCn/button";
import { Input } from "@/shared/ui/shadCn/input";
import { Textarea } from "@/shared/ui/shadCn/textarea";
import { createOrder } from "@/shared/api/orders";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import DaumPostcode from "react-daum-postcode"; // ✅ 카카오 주소 API 추가

// ✅ 토스페이먼츠 스크립트 로드를 동적 컴포넌트로 분리
const TossPaymentsLoader = dynamic(() => import("./TossPaymentsLoader"), {
  ssr: false,
});

const getFullImageUrl = (imagePath: string) => {
  const baseUrl = "https://goldsilk.net/images/";
  return imagePath.startsWith("http") ? imagePath : `${baseUrl}${imagePath}`;
};

export default function CheckoutPage() {
  const { cart, clear } = useCart();
  const { user } = useUserStore();
  const router = useRouter();

  const [recipientName, setRecipientName] = useState(user?.username || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
  const [shippingAddress, setShippingAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false); // ✅ 주소 검색 모달 상태

  if (cart.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-semibold">장바구니가 비어 있습니다.</p>
        <Button onClick={() => router.push("/")}>상품 둘러보기</Button>
      </div>
    );
  }

  const productTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = productTotal >= 50000 ? 0 : 3000;
  const totalAmount = productTotal + shippingFee;

  /** ✅ 카카오 주소 API (react-daum-postcode) */
  const handleAddressSelect = (data: any) => {
    setShippingAddress(data.address);
    setIsAddressOpen(false);
  };

  /** ✅ 주문 및 결제 처리 */
  const handlePayment = async () => {
    if (!recipientName || !phoneNumber || !shippingAddress) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        user_id: user?.user_id || 1,
        total_amount: totalAmount,
        shipping_address: shippingAddress,
        recipient_name: recipientName,
        phone_number: phoneNumber,
        message,
        cart_items: cart.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          options: item.options || {},
        })),
        valid_order_id: `ORDER_${Date.now()}`,
      };

      const response = await createOrder(orderData);

      console.log("✅ 주문 생성 완료: ", response);

      if (!response || !response.order || !response.order.valid_order_id) {
        throw new Error("🚨 주문 ID를 가져올 수 없습니다.");
      }

      const validOrderId = response.order.valid_order_id; // ✅ valid_order_id 사용
      console.log("✅ 주문 ID:", validOrderId);

      // ✅ 토스페이먼츠 결제 호출
      const toss = window.TossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY);
      toss.requestPayment("카드", {
        amount: totalAmount,
        orderId: validOrderId,
        orderName: `주문번호 ${validOrderId}`,
        successUrl: `${window.location.origin}/Payment/success?orderId=${validOrderId}`,
        failUrl: `${window.location.origin}/payment/fail?orderId=${validOrderId}`,
        customerEmail: user?.email,
        customerName: recipientName,
      });
    } catch (error) {
      console.error("🚨 결제 오류:", error);
      alert("결제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🛍 주문하기</h2>

      {/* ✅ 토스페이먼츠 스크립트 로드 */}
      <TossPaymentsLoader />

      <div className="border rounded-lg shadow-sm bg-white p-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.cart_id}
            className="flex items-center gap-4 border-b py-3"
          >
            <Image
              src={getFullImageUrl(item.images[0])}
              width={80}
              height={80}
              alt={item.name}
              className="rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">
                {item.price}원 x {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-lg shadow-sm bg-white p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">📦 배송 정보</h3>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="수령인 이름"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
          <Input
            type="tel"
            placeholder="연락처"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="배송지 주소"
              value={shippingAddress}
              readOnly
            />
            <Button onClick={() => setIsAddressOpen(true)}>주소 찾기</Button>
          </div>
          <Textarea
            placeholder="배송 요청사항 (선택)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="border-t pt-4 flex justify-between items-center">
        <p className="text-xl font-bold">
          총 결제 금액: {totalAmount.toLocaleString()}원
        </p>
        <Button onClick={handlePayment} disabled={loading}>
          {loading ? "결제 중..." : "💳 결제하기"}
        </Button>
      </div>

      {/* ✅ 카카오 주소 검색 모달 */}
      {isAddressOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">📍 주소 검색</h3>
            <DaumPostcode onComplete={handleAddressSelect} />
            <Button
              className="mt-2 w-full"
              onClick={() => setIsAddressOpen(false)}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
