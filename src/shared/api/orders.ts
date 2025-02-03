import axiosInstance from "./axiosInstance";
import { OrderDetail, CreateOrderRequest } from "@/shared/types/orders";

/** 주문 생성 */
export async function createOrder(orderData: CreateOrderRequest) {
  const { data } = await axiosInstance.post("/orders", orderData);
  return data;
}

/** 특정 주문 조회 */
export async function fetchOrder(orderId: number): Promise<OrderDetail> {
  const { data } = await axiosInstance.get(`/orders/detail/${orderId}`);
  return data;
}

/** 내 주문 목록 조회 (페이징 지원) */
export async function fetchMyOrders(page: number = 1, limit: number = 10) {
  const { data } = await axiosInstance.get("/orders/my_orders", {
    params: { page, limit },
  });
  return data;
}

/** 주문 상태 업데이트 */
export async function updateOrderStatus(orderId: number, order_status: string) {
  const { data } = await axiosInstance.put(`/orders/${orderId}`, {
    order_status,
  });
  return data;
}

/** 주문 상세 정보 업데이트 */
export async function updateOrderDetails(
  orderId: number,
  details: {
    recipient_name: string;
    phone_number: string;
    shipping_address: string;
    message: string;
  }
) {
  const { data } = await axiosInstance.put(
    `/orders/${orderId}/details`,
    details
  );
  return data;
}

/** 주문 취소 */
export async function cancelOrder(orderId: number) {
  const { data } = await axiosInstance.put(`/orders/${orderId}/cancel`);
  return data;
}

/** 배송 상태 확인 */
export async function checkShippingStatus(orderId: number) {
  const { data } = await axiosInstance.get(
    `/orders/${orderId}/shipping-status`
  );
  return data;
}

/** 배송지 수정 */
export async function updateShippingAddress(
  orderId: number,
  shipping_address: string
) {
  const { data } = await axiosInstance.put(
    `/orders/${orderId}/shipping-address`,
    { shipping_address }
  );
  return data;
}

/** 모든 주문 조회 (관리자) */
export async function fetchAllOrders() {
  const { data } = await axiosInstance.get("/orders/all-orders");
  return data;
}

/** valid_order_id를 기반으로 order_id 조회 */
export async function getOrderIdByValidOrderId(validOrderId: string) {
  const { data } = await axiosInstance.get(`/orders/lookup/${validOrderId}`);
  return data;
}
