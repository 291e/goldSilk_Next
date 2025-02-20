"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  ShoppingCart,
  UserRoundIcon,
  UserRoundPlus,
  ChevronDown,
  Settings,
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
  { name: "Special 한복", href: "/custom_hanbok" },
  {
    name: "리틀황금단",
    href: "/little_hwanggeumdan",
    subMenu: [
      { name: "아동한복", href: "/little_hwanggeumdan/children" },
      { name: "돌잔치한복", href: "/little_hwanggeumdan/firstbirthday" },
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
    href: "/commu/home",
    subMenu: [
      { name: "FAQ", href: "/commu/inquiries" },
      { name: "황금단 소식", href: "/commu/notice" },
      { name: "이벤트", href: "/commu/events" },
      { name: "체인점 안내", href: "/commu/branches" },
      { name: "후기", href: "/reviewCommunity" },
    ],
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, isLoading } = useUserStore();
  const [isAdmin, setIsAdmin] = useState(user?.is_admin === true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setIsAdmin(user?.is_admin === true); // ✅ 유저 상태 변경 시 관리자 여부 업데이트
  }, [user]);

  // 🔒 사이드바 열렸을 때 외부 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 페이지 스크롤 막기
    } else {
      document.body.style.overflow = ""; // 스크롤 다시 활성화
    }

    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 스크롤 복구
    };
  }, [isOpen]);

  if (isLoading) {
    return <div className="w-full h-16 bg-white shadow-md">로딩 중...</div>; // ✅ 로딩 중이면 깜빡임 방지
  }

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
        className="fixed top-0 right-0 w-64 bg-white shadow-lg h-full z-50 flex flex-col"
      >
        {/* 상단 네비 */}
        <div className="flex justify-between items-center border-b px-4 py-3">
          {isAuthenticated ? (
            <Link href="/profile" className="text-gray-700 hover:text-primary">
              <UserRoundIcon size={24} />
            </Link>
          ) : (
            <Link href="/login" className="text-gray-700 hover:text-primary">
              <UserRoundPlus size={24} />
            </Link>
          )}
          <Link href="/Carts" className="text-gray-700 hover:text-primary">
            <ShoppingCart size={24} />
          </Link>
          {isAdmin && ( // ✅ 어드민이면 보이게 설정
            <Link href="/ko" className="text-gray-700 hover:text-primary">
              <Settings size={24} />
            </Link>
          )}
        </div>

        {/* 메뉴 리스트 (외부 스크롤 막고 사이드바 내부 스크롤 가능) */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
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
        </nav>

        {/* 닫기 버튼 */}
        <button
          className="p-4 text-gray-700 border-t-[1px] w-full"
          onClick={() => setIsOpen(false)}
        >
          닫기
        </button>
      </motion.div>
    </>
  );
}
