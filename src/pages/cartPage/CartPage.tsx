"use client";

import { useCart } from "@/shared/hooks/useCart";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Button } from "@/shared/ui/shadCn/button";
import { Input } from "@/shared/ui/shadCn/input";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/shadCn/table";
import { Trash2 } from "lucide-react";

const getFullImageUrl = (imagePath: string) => {
  const baseUrl = "https://goldsilk.net/images/";
  return imagePath.startsWith("http") ? imagePath : `${baseUrl}${imagePath}`;
};

export default function CartPage() {
  const { cart, loading, updateItem, removeItem, clear } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Debounce 적용 (500ms 후 API 호출)
  const debouncedQuantities = useDebounce(quantities, 500);

  useEffect(() => {
    Object.entries(debouncedQuantities).forEach(([cartId, quantity]) => {
      updateItem(Number(cartId), quantity);
    });
  }, [debouncedQuantities, updateItem]);

  if (loading) return <p className="text-center">🛒 장바구니 로딩 중...</p>;
  if (cart.length === 0)
    return (
      <div className="text-center py-10">
        <p className="text-lg font-semibold">장바구니가 비어 있습니다.</p>
        <Link href="/">
          <Button className="mt-3">상품 둘러보기</Button>
        </Link>
      </div>
    );

  const totalQuantity = cart.reduce(
    (acc, item) => acc + (quantities[item.cart_id] ?? item.quantity),
    0
  );
  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + item.price * (quantities[item.cart_id] ?? item.quantity),
    0
  );

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">장바구니</h2>

      {/* 장바구니 테이블 */}
      <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-12 text-center">순서</TableHead>
              <TableHead className="w-32 text-center">상품</TableHead>
              <TableHead className="text-left">상품명</TableHead>
              <TableHead className="w-24 text-center">가격</TableHead>
              <TableHead className="w-24 text-center">개수</TableHead>
              <TableHead className="w-24 text-center">합계</TableHead>
              <TableHead className="w-20 text-center">삭제</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={item.cart_id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center flex justify-center w-full">
                  <Image
                    src={getFullImageUrl(item.images[0])}
                    width={60}
                    height={60}
                    alt={item.name}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-center">{item.price}원</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Input
                      type="number"
                      min="1"
                      value={quantities[item.cart_id] ?? item.quantity}
                      onChange={(e) =>
                        setQuantities({
                          ...quantities,
                          [item.cart_id]: Number(e.target.value),
                        })
                      }
                      className="w-16 text-center p-0"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {(
                    item.price * (quantities[item.cart_id] ?? item.quantity)
                  ).toLocaleString()}
                  원
                </TableCell>
                <TableCell className="text-center">
                  <button onClick={() => removeItem(item.cart_id)}>
                    <Trash2 className="text-red-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 하단 결제 정보 */}
      <div className="mt-6 flex justify-between items-start border-t pt-4">
        <div>
          <Button variant="outline" onClick={clear} className="text-red-500">
            장바구니 비우기
          </Button>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="text-base w-40">
            <div className="flex justify-between w-full">
              <span>총 상품 개수</span> <span>{totalQuantity}개</span>
            </div>
            <div className="flex justify-between w-full">
              <span>합계</span> <span>{totalPrice.toLocaleString()}원</span>
            </div>
          </div>
          <Link href="/checkout">
            <Button>🛍 결제하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
