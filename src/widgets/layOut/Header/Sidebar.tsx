"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, UserRoundPlus } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 햄버거 버튼 */}
      <button
        className="md:hidden p-2 text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={30} />
      </button>

      {/* 사이드바 */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`fixed top-0 right-0 w-64 bg-white shadow-lg h-full transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <nav className="flex flex-col p-4 space-y-4">
            <div className="flex gap-4 border-b-[1px] pb-4 justify-between">
              <Link href="/login" className="text-gray-700 hover:text-primary">
                <UserRoundPlus size={24} />
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-primary">
                <ShoppingCart size={24} />
              </Link>
            </div>

            <Link href="/brand" className="text-gray-700 hover:text-primary">
              BRAND
            </Link>
            <Link href="/honju" className="text-gray-700 hover:text-primary">
              혼주한복
            </Link>
            <Link href="/wedding" className="text-gray-700 hover:text-primary">
              신랑신부한복
            </Link>
            <Link href="/women" className="text-gray-700 hover:text-primary">
              여성한복
            </Link>
            <Link href="/children" className="text-gray-700 hover:text-primary">
              아동한복
            </Link>
            <Link
              href="/firstbirthday"
              className="text-gray-700 hover:text-primary"
            >
              돌잔치한복
            </Link>
            <Link href="/custom" className="text-gray-700 hover:text-primary">
              맞춤한복
            </Link>
            <Link href="/daily" className="text-gray-700 hover:text-primary">
              생활한복
            </Link>
            <Link
              href="/photoshoot"
              className="text-gray-700 hover:text-primary"
            >
              화보촬영
            </Link>
            <Link
              href="/sponsorship"
              className="text-gray-700 hover:text-primary"
            >
              협찬
            </Link>
            <Link
              href="/community"
              className="text-gray-700 hover:text-primary"
            >
              COMMUNITY
            </Link>

            <button
              className="p-4 text-gray-700 self-end justify-self-end border-t-[1px] w-full"
              onClick={() => setIsOpen(false)}
            >
              닫기
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
