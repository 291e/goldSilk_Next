"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import kakao from "@/shared/assets/kakao.png";
import Image from "next/image";

export default function Remote() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 감지하여 버튼 표시 여부 결정
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 맨 위로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 맨 아래로 이동
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-2 sm:right-6 flex flex-col items-center space-y-3 z-50">
      {/* SNS 아이콘 */}
      <Link
        href="https://open.kakao.com/o/s5zVFwEg"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-200 text-white p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <Image src={kakao} alt="카카오톡" width={20} height={20} />
      </Link>
      <Link
        href="https://www.instagram.com/goldsilk_cd"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-400 text-white p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <Instagram size={20} />
      </Link>
      <Link
        href="https://www.youtube.com/@goldsilk-np4md"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-red-600 text-white p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <Youtube size={20} />
      </Link>

      {/* 스크롤 버튼 (맨 위 / 맨 아래) */}
      {isVisible && (
        <>
          <button
            onClick={scrollToTop}
            className="bg-gray-700 text-white p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <ChevronUp size={20} />
          </button>
          <button
            onClick={scrollToBottom}
            className="bg-gray-700 text-white p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <ChevronDown size={20} />
          </button>
        </>
      )}
    </div>
  );
}
