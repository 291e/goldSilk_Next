"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const categoryNames: Record<string, string> = {
  k_hanbok: "K-Hanbok",
  honju_hanbok: "혼주한복",
  wedding_hanbok: "신랑신부한복",
  custom_hanbok: "Special 한복",
  little_hwanggeumdan: "리틀황금단",
  hanbok_accessories: "한복소품",
  pet_hanbok: "반려동물한복",
  k_goods: "K-Goods",
};

export default function Breadcrumbs({ category }: { category: string }) {
  return (
    <motion.nav
      className="flex items-center space-x-2 text-gray-600 text-sm mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href="/" className="hover:text-primary">
        홈
      </Link>
      <ChevronRight size={16} />
      <span className="font-medium">{categoryNames[category] || category}</span>
    </motion.nav>
  );
}
