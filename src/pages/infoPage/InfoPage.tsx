"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  brandBanner2,
  brandInfo1,
  brandInfo2,
  brandInfo3,
} from "@/shared/assets/brand";
import { Button } from "@/shared/ui";
import Image from "next/image";

const tabs = [
  { key: "custom", label: "한복맞춤안내", image: brandInfo1 },
  { key: "wear", label: "한복입어보기", image: brandInfo2 },
  { key: "measure", label: "한복치수재기", image: brandInfo3 },
];

export default function InfoPage() {
  const router = useRouter();
  const params = useParams() || {}; // ✅ 기본값 설정
  const { tab } = params;
  const [selectedTab, setSelectedTab] = useState(tab || "custom");

  useEffect(() => {
    setSelectedTab(tab || "custom"); // ✅ URL 변경 시 자동 반영
  }, [tab]);

  const handleTabClick = (key: string) => {
    setSelectedTab(key);
    router.push(`/info/${key}`); // ✅ 동적 경로로 이동
  };

  const selectedImage = tabs.find((t) => t.key === selectedTab)?.image;

  return (
    <div>
      <div className="flex justify-center items-center text-[#353535] relative">
        <Image
          src={brandBanner2}
          alt="황금단"
          width={0}
          height={0}
          quality={100}
          className="w-full"
        />
        <div className="absolute text-center flex flex-col gap-4 items-center">
          <span className="text-3xl font-semibold">(주)황금단</span>
          <div className="w-full max-w-20 h-[2px] bg-[#353535]" />
          <span className="text-xl font-semibold">
            한복을 디자인하는 전문기업
          </span>
          <span>
            저희 황금단은 우리나라의 소중한 전통문화인 한복을 전문으로 제작하는
            회사로,
            <br />
            “한복을 디자인하는 전문기업” 으로 한국의 아름다움을 전 세계에
            알리고자 하는 열정으로 가득 차 있습니다.
          </span>
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="flex gap-4 justify-center my-8">
        {tabs.map(({ key, label }) => (
          <Button
            key={key}
            onClick={() => handleTabClick(key)}
            className={`px-6 py-2 ${
              selectedTab === key
                ? "bg-primary text-white border-b-4 border-primary"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* 선택된 이미지 렌더링 */}
      <div className="w-full flex justify-center items-center">
        {selectedImage && <Image src={selectedImage} alt="Selected" />}
      </div>
    </div>
  );
}
