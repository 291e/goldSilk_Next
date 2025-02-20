"use client";

import { useEffect, useState } from "react";
import { fetchAllReviews } from "@/shared/api/reviews";
import { Review } from "@/shared/types/reviews";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui";
import Image from "next/image";
import logo from "@/app/logo.jpg";
import { ReviewCard } from "@/entities/main/ui/review/ReviewCard";

/** 이미지 경로 변환 함수 */
const getFullImageUrl = (path: string | null | undefined) => {
  if (!path) return logo; // 기본 이미지 설정
  return path.startsWith("http") ? path : `https://goldsilk.net/images/${path}`;
};

export default function ReviewCommunityPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchAllReviews();
        setReviews(data);
      } catch (error) {
        console.error("🚨 리뷰 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return <p className="text-center">🔄 리뷰를 불러오는 중...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6"> 전체 리뷰 목록</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              review={review}
              onclick={() => setSelectedReview(review)}
              onReviewUpdate={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">리뷰가 없습니다.</p>
        )}
      </div>

      {/* 리뷰 팝업 */}
      {selectedReview && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedReview(null)}
        >
          <motion.div
            className="bg-white p-8 rounded-lg max-w-3xl w-full relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              {selectedReview.title || "제목 없음"}
            </h2>
            <p className="mb-4">{selectedReview.content || "내용 없음"}</p>
            {selectedReview.image_url && (
              <Image
                src={getFullImageUrl(selectedReview.image_url)}
                alt={selectedReview.title || "리뷰 이미지"}
                width={500}
                height={300}
                className="rounded mb-4"
              />
            )}
            <Button onClick={() => setSelectedReview(null)}>닫기</Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
