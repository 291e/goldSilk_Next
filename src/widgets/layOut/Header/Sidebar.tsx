"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  ShoppingCart,
  UserRoundIcon,
  UserRoundPlus,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "@/shared/store/useUserStore";

const menuItems = [
  { name: "브랜드", href: "/brand" },
  {
    name: "K-Hanbok",
    href: "/k_hanbok",
    subMenu: [
      { name: "실속형 한복", href: "/k_hanbok/basic" },
      { name: "생활한복", href: "/k_hanbok/daily" },
      { name: "K-POP 한복", href: "/k_hanbok/kpop" },
    ],
  },
  { name: "혼주한복", href: "/honju_hanbok" },
  { name: "신랑신부한복", href: "/wedding_hanbok" },
  { name: "Special 한복", href: "/special_hanbok" },
  {
    name: "리틀황금단",
    href: "/little_hwanggeumdan",
    subMenu: [
      { name: "아동한복", href: "/little_hwanggeumdan/kids" },
      { name: "돌잔치한복", href: "/little_hwanggeumdan/first_birthday" },
    ],
  },
  {
    name: "한복소품",
    href: "/hanbok_accessories",
    subMenu: [
      { name: "속치마", href: "/hanbok_accessories/underskirt" },
      { name: "신발", href: "/hanbok_accessories/shoes" },
      { name: "버선", href: "/hanbok_accessories/socks" },
      { name: "노리개", href: "/hanbok_accessories/norigae" },
      { name: "뒷곶이", href: "/hanbok_accessories/back_ornament" },
      { name: "장신구", href: "/hanbok_accessories/jewelry" },
    ],
  },
  { name: "반려동물한복", href: "/pet_hanbok" },
  { name: "K-Goods", href: "/k_goods" },
  {
    name: "커뮤니티",
    href: "/community",
    subMenu: [
      { name: "FAQ", href: "/community/faq" },
      { name: "황금단 소식", href: "/community/news" },
      { name: "이벤트", href: "/community/event" },
      { name: "체인점 안내", href: "/community/stores" },
      { name: "후기", href: "/community/reviews" },
    ],
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useUserStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      {/* 햄버거 버튼 */}
      <button
        className="md:hidden p-2 text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={30} />
      </button>

      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 사이드바 */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 w-64 bg-white shadow-lg h-full z-50"
      >
        <nav className="flex flex-col p-4 space-y-4">
          {/* 상단 로그인/장바구니 */}
          <div className="flex gap-4 border-b-[1px] pb-4 justify-between">
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="text-gray-700 hover:text-primary"
              >
                <UserRoundIcon size={24} />
              </Link>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-primary">
                <UserRoundPlus size={24} />
              </Link>
            )}
            <Link href="/cart" className="text-gray-700 hover:text-primary">
              <ShoppingCart size={24} />
            </Link>
          </div>

          {/* 메뉴 리스트 */}
          {menuItems.map(({ name, href, subMenu }) => (
            <div key={name}>
              {subMenu ? (
                <>
                  <button
                    className="w-full flex justify-between items-center text-gray-700 hover:text-primary p-2"
                    onClick={() =>
                      setOpenDropdown(openDropdown === name ? null : name)
                    }
                  >
                    {name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        openDropdown === name ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {/* 서브메뉴 */}
                  {openDropdown === name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 space-y-2"
                    >
                      {subMenu.map(({ name, href }) => (
                        <Link
                          key={name}
                          href={href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          {name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </>
              ) : (
                <Link
                  href={href}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </Link>
              )}
            </div>
          ))}

          {/* 닫기 버튼 */}
          <button
            className="p-4 text-gray-700 border-t-[1px] w-full"
            onClick={() => setIsOpen(false)}
          >
            닫기
          </button>
        </nav>
      </motion.div>
    </>
  );
}
