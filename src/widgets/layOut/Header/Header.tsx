"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  UserRoundPlus,
  ShoppingCart,
  UserRoundIcon,
  ChevronDown,
  Settings,
} from "lucide-react";
import Logo from "@/shared/assets/logo.jpg";
import Sidebar from "./Sidebar";
import { useUserStore } from "@/shared/store/useUserStore";
import SkeletonHeader from "./SkeletonHeader";
import { useCartStore } from "@/shared/store/useCartStore";

const menuItems = [
  { name: "브랜드", href: "/brand" },
  {
    name: "K-Hanbok",
    href: "/k_hanbok",
    subMenu: [
      { name: "실속형 한복", href: "/basic" },
      { name: "생활한복", href: "/k_hanbok" },
      { name: "K-POP 한복", href: "/kpop" },
    ],
  },
  {
    name: "혼주한복",
    href: "/honju_hanbok",
  },
  {
    name: "신랑신부한복",
    href: "/wedding_hanbok",
  },
  {
    name: "Special 한복",
    href: "/custom_hanbok",
  },
  {
    name: "리틀황금단",
    href: "/little_hwanggeumdan",
    subMenu: [
      { name: "아동한복", href: "/kids" },
      { name: "돌잔치한복", href: "/first_birthday" },
    ],
  },
  {
    name: "한복소품",
    href: "/hanbok_accessories",
    subMenu: [
      { name: "속치마", href: "/underskirt" },
      { name: "신발", href: "/shoes" },
      { name: "버선", href: "/socks" },
      { name: "노리개", href: "/norigae" },
      { name: "뒷곶이", href: "/back_ornament" },
      { name: "장신구", href: "/jewelry" },
    ],
  },
  {
    name: "반려동물한복",
    href: "/pet_hanbok",
  },
  {
    name: "K-Goods",
    href: "/k_goods",
  },
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, isLoading } = useUserStore();
  const { cartCount } = useCartStore(); // ✅ 장바구니 아이템 가져오기
  const [isAdmin, setIsAdmin] = useState(user?.is_admin === true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsAdmin(user?.is_admin === true); // ✅ 유저 상태 변경 시 관리자 여부 업데이트
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 64);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout); // 기존 타이머 제거
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 200); // 180ms 지연 후 닫힘
    setHoverTimeout(timeout);
  };

  if (isLoading) {
    return <SkeletonHeader />; // ✅ 로딩 중이면 깜빡임 방지
  }

  return (
    <>
      {/* 처음에 보이는 기본 헤더 */}
      {!scrolled && (
        <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
          <div className="container gap-4 mx-auto flex justify-between xl:justify-around items-center py-4 px-6 text-xs lg:text-sm sm:px-2 lg:px-6 sm:max-w-full max-md:max-w-full">
            {/* 로고 */}
            <Link href="/">
              <Image src={Logo} alt="황금단 로고" width={100} height={100} />
            </Link>

            {/* 네비게이션 */}
            <nav className="hidden md:flex space-x-4 lg:space-x-6 items-center">
              {menuItems.map(({ name, href, subMenu }) => (
                <div key={name} className="relative group">
                  <Link
                    href={href}
                    className="text-gray-700 hover:text-primary flex items-center gap-1"
                    onMouseEnter={() => handleMouseEnter(name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {name}
                    {subMenu && <ChevronDown size={14} />}
                  </Link>

                  {/* 드롭다운 메뉴 */}
                  {subMenu && openDropdown === name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-52 bg-white shadow-lg rounded-md p-2"
                      onMouseEnter={() => handleMouseEnter(name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {subMenu.map(({ name, href }) => (
                        <Link
                          key={name}
                          href={href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            <nav className="hidden md:flex space-x-4">
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-primary"
                >
                  <UserRoundIcon size={20} />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary"
                >
                  <UserRoundPlus size={20} />
                </Link>
              )}
              <Link
                href="/Carts"
                className="relative text-gray-700 hover:text-primary"
              >
                <ShoppingCart size={20} />
                {cartCount() > 0 && ( // ✅ 장바구니 개수 있으면 배지 표시
                  <span className="absolute -top-2 -right-2 bg-[#353535] text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount()}
                  </span>
                )}
              </Link>
              {isAdmin && ( // ✅ 어드민이면 보이게 설정
                <Link href="/ko" className="text-gray-700 hover:text-primary">
                  <Settings size={20} />
                </Link>
              )}
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <Sidebar />
          </div>
        </header>
      )}

      {/* 스크롤 후 등장하는 애니메이션 헤더 */}
      {scrolled && (
        <motion.header
          initial={{ y: -100, opacity: 0 }} // 처음에는 위에 숨겨져 있음
          animate={{ y: 0, opacity: 1 }} // 등장할 때 아래로 내려옴
          transition={{ duration: 0.5 }} // 부드러운 애니메이션 적용
          className="bg-white shadow-md fixed w-full top-0 z-50"
        >
          <div className="container gap-4 mx-auto flex justify-between xl:justify-around items-center py-4 px-6 text-xs lg:text-sm sm:px-2 lg:px-6 sm:max-w-full max-md:max-w-full">
            {/* 로고 */}
            <Link href="/">
              <Image src={Logo} alt="황금단 로고" width={100} height={100} />
            </Link>

            {/* 네비게이션 */}
            <nav className="hidden md:flex space-x-4 lg:space-x-6 items-center">
              {menuItems.map(({ name, href, subMenu }) => (
                <div key={name} className="relative group">
                  <Link
                    href={href}
                    className="text-gray-700 hover:text-primary flex items-center gap-1"
                    onMouseEnter={() => handleMouseEnter(name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {name}
                    {subMenu && <ChevronDown size={14} />}
                  </Link>

                  {/* 드롭다운 메뉴 */}
                  {subMenu && openDropdown === name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-52 bg-white shadow-lg rounded-md p-2"
                      onMouseEnter={() => handleMouseEnter(name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {subMenu.map(({ name, href }) => (
                        <Link
                          key={name}
                          href={href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            <nav className="hidden md:flex space-x-4">
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-primary"
                >
                  <UserRoundIcon size={20} />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary"
                >
                  <UserRoundPlus size={20} />
                </Link>
              )}
              <Link
                href="/Carts"
                className="relative text-gray-700 hover:text-primary"
              >
                <ShoppingCart size={20} />
                {cartCount() > 0 && ( // ✅ 장바구니 개수 있으면 배지 표시
                  <span className="absolute -top-2 -right-2 bg-[#353535] text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount()}
                  </span>
                )}
              </Link>
              {isAdmin && ( // ✅ 어드민이면 보이게 설정
                <Link href="/ko" className="text-gray-700 hover:text-primary">
                  <Settings size={20} />
                </Link>
              )}
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <Sidebar />
          </div>
        </motion.header>
      )}
    </>
  );
}
