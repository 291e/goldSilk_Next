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
} from "lucide-react";
import Logo from "@/shared/assets/logo.jpg";
import Sidebar from "./Sidebar";
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
    href: "/special_hanbok",
  },
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useUserStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 64) {
        setScrolled(true); // 64px 이상 스크롤 시 애니메이션 실행
      } else {
        setScrolled(false); // 64px 이하일 때 기본 상태
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 처음에 보이는 기본 헤더 */}
      {!scrolled && (
        <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
          <div className="container gap-4 mx-auto flex justify-between items-center py-4 px-6 text-xs lg:text-base">
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
                    onMouseEnter={() => subMenu && setOpenDropdown(name)}
                    onMouseLeave={() => setOpenDropdown(null)}
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
                      className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2"
                      onMouseEnter={() => setOpenDropdown(name)}
                      onMouseLeave={() => setOpenDropdown(null)}
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

            <nav className="hidden md:flex space-x-6">
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-primary"
                >
                  <UserRoundIcon size={24} />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary"
                >
                  <UserRoundPlus size={24} />
                </Link>
              )}
              <Link href="/cart" className="text-gray-700 hover:text-primary">
                <ShoppingCart size={24} />
              </Link>
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
          transition={{ duration: 0.3 }} // 부드러운 애니메이션 적용
          className="bg-white shadow-md fixed w-full top-0 z-50"
        >
          <div className="container gap-4 mx-auto flex justify-between items-center py-4 px-6 text-xs lg:text-base">
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
                    onMouseEnter={() => subMenu && setOpenDropdown(name)}
                    onMouseLeave={() => setOpenDropdown(null)}
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
                      className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2"
                      onMouseEnter={() => setOpenDropdown(name)}
                      onMouseLeave={() => setOpenDropdown(null)}
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

            <nav className="hidden md:flex space-x-6">
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-primary"
                >
                  <UserRoundIcon size={24} />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary"
                >
                  <UserRoundPlus size={24} />
                </Link>
              )}
              <Link href="/cart" className="text-gray-700 hover:text-primary">
                <ShoppingCart size={24} />
              </Link>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <Sidebar />
          </div>
        </motion.header>
      )}
    </>
  );
}
