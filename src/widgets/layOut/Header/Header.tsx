"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { UserRoundPlus, ShoppingCart } from "lucide-react";
import Logo from "@/shared/assets/logo.jpg";
import Sidebar from "./Sidebar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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
              <Link href="/brand" className="text-gray-700 hover:text-primary">
                BRAND
              </Link>
              <Link href="/honju" className="text-gray-700 hover:text-primary">
                혼주한복
              </Link>
              <Link
                href="/wedding"
                className="text-gray-700 hover:text-primary"
              >
                신랑신부한복
              </Link>
              <Link href="/women" className="text-gray-700 hover:text-primary">
                여성한복
              </Link>
              <Link
                href="/children"
                className="text-gray-700 hover:text-primary"
              >
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
            </nav>

            <nav className="hidden md:flex space-x-6">
              <Link href="/login" className="text-gray-700 hover:text-primary">
                <UserRoundPlus size={24} />
              </Link>
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
              <Link href="/brand" className="text-gray-700 hover:text-primary">
                BRAND
              </Link>
              <Link href="/honju" className="text-gray-700 hover:text-primary">
                혼주한복
              </Link>
              <Link
                href="/wedding"
                className="text-gray-700 hover:text-primary"
              >
                신랑신부한복
              </Link>
              <Link href="/women" className="text-gray-700 hover:text-primary">
                여성한복
              </Link>
              <Link
                href="/children"
                className="text-gray-700 hover:text-primary"
              >
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
            </nav>

            <nav className="hidden md:flex space-x-6">
              <Link href="/login" className="text-gray-700 hover:text-primary">
                <UserRoundPlus size={24} />
              </Link>
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
