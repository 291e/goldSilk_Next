"use client";

import { useEffect, useState } from "react";
import { fetchMyOrders } from "@/shared/api/orders";
import { Order } from "@/shared/types/orders";
import { Button } from "@/shared/ui/shadCn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/shadCn/table";
import { useRouter } from "next/navigation";
import FilterSelect from "@/widgets/community/FilterSelect";
import Pagination from "@/widgets/community/Pagination";

const FILTER_OPTIONS = [
  { value: "pending", label: "대기 중" },
  { value: "completed", label: "주문 완료" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<string | null>(null); // ✅ 필터 상태 추가
  const router = useRouter();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchMyOrders(currentPage, 10, filter); // ✅ 필터링된 상태로 API 요청

        setOrders(data.orders);
        setTotalPages(data.totalPages);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [currentPage, filter]); // ✅ 페이지 & 필터 변경 시 API 호출

  /** ✅ 필터 변경 시 첫 페이지로 이동 */
  const handleFilterChange = (newFilter: string | null) => {
    setFilter(newFilter);
    setCurrentPage(1); // ✅ 필터 변경 시 페이지 1로 리셋
  };

  if (loading) {
    return <p className="text-center">📦 주문 내역을 불러오는 중...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center">
        <p className="text-lg font-semibold">📭 주문 내역이 없습니다.</p>
        <Button onClick={() => router.push("/")}>상품 둘러보기</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📦 내 주문 내역</h2>

      {/* ✅ 필터 UI 추가 */}
      <div className="flex justify-between items-center mb-4">
        <FilterSelect
          filter={filter}
          setFilter={handleFilterChange}
          options={FILTER_OPTIONS}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>주문 번호</TableHead>
            <TableHead>배송지</TableHead>
            <TableHead>총 금액</TableHead>
            <TableHead>주문 상태</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>상세 보기</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell>{order.order_id}</TableCell>
              <TableCell>{order.shipping_address}</TableCell>
              <TableCell>{order.total_amount.toLocaleString()} 원</TableCell>
              <TableCell>
                {order.order_status === "pending" ? "대기 중" : "주문 완료"}
              </TableCell>
              <TableCell>
                {new Date(order.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/order/${order.order_id}`)}
                >
                  상세 보기
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ✅ 페이지네이션 UI 추가 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
