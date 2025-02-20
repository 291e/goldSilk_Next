"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmPayment } from "@/shared/api/payments"; // ✅ 백엔드 결제 승인 API 호출
import { Button } from "@/shared/ui/shadCn/button";
import { useCart } from "@/shared/hooks/useCart";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clear } = useCart();

  // ✅ 상태로 파라미터 저장 (초기 렌더링 문제 해결)
  const [validOrderId, setValidOrderId] = useState<string | null>(null);
  const [paymentKey, setPaymentKey] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);

  useEffect(() => {
    const orderId = searchParams?.get("orderId");
    const paymentKeyValue = searchParams?.get("paymentKey");
    const amountValue = searchParams?.get("amount");

    setValidOrderId(orderId ?? null);
    setPaymentKey(paymentKeyValue ?? null);
    setAmount(amountValue ?? null);
  }, [searchParams]);

  useEffect(() => {
    if (!validOrderId || !paymentKey || !amount) {
      console.error("🚨 결제 승인 파라미터가 부족합니다.");
      return;
    }

    // ✅ 백엔드에 결제 승인 요청
    const approvePayment = async () => {
      try {
        const response = await confirmPayment({
          paymentKey,
          orderId: validOrderId,
          amount: Number(amount),
        });

        console.log("✅ 결제 승인 완료:", response);
        clear();
      } catch (error) {
        console.error("🚨 결제 승인 실패:", error);
      }
    };

    approvePayment();
  }, [validOrderId, paymentKey, amount]);

  if (!validOrderId || !paymentKey || !amount) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          ❌ 결제 승인에 실패했습니다.
        </h2>
        <p className="text-gray-700">유효한 결제 정보가 없습니다.</p>
        <Button className="mt-4" onClick={() => router.push("/")}>
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🎉 결제가 완료되었습니다!</h2>
      <p>주문 번호: {validOrderId}</p>
      <p>결제 금액: {amount}원</p>

      <Button className="mt-4" onClick={() => router.push("/Orders")}>
        주문 내역 확인하기
      </Button>
    </div>
  );
}

// ✅ `Suspense`로 감싸서 `useSearchParams()`가 서버에서 실행되지 않도록 함.
export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={<p className="text-center">🔄 결제 정보를 불러오는 중...</p>}
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
