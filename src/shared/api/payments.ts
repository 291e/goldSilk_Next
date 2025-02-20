import axiosInstance from "./axiosInstance";

/** ✅ 결제 승인 API 호출 */
export async function confirmPayment({
  paymentKey,
  orderId,
  amount,
}: {
  paymentKey: string;
  orderId: string;
  amount: number;
}) {
  try {
    const { data } = await axiosInstance.post("/payment/confirm", {
      paymentKey,
      orderId,
      amount,
    });
    return data;
  } catch (error: any) {
    console.error("🚨 결제 승인 실패:", error.response?.data || error.message);
    throw new Error("결제 승인에 실패했습니다.");
  }
}
