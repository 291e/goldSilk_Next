"use client";

import React, { useEffect, useState } from "react";
import { ReviewCard } from "@/entities/main/ui/review/ReviewCard";
import { fetchReviewsByProduct } from "@/shared/api/reviews";
import { Skeleton } from "@/shared/ui";
import { ReviewForm } from "../review/ReviewForm";
import { Review } from "@/shared/types/reviews";
import { Button } from "@/shared/ui/shadCn/button";
import Link from "next/link";

interface ReviewSectionProps {
  productId: string;
}

export const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // ✅ 리뷰 불러오기 함수
  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const data = await fetchReviewsByProduct(Number(productId));

      if (showAllReviews) {
        setReviews(data); // ✅ 모든 리뷰 표시
        setHasMore(false);
      } else {
        setReviews((prevReviews) => [
          ...prevReviews,
          ...data.slice(prevReviews.length, prevReviews.length + 5),
        ]);
        setHasMore(data.length > reviews.length + 5);
      }
    } catch (error) {
      console.error("리뷰 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productId, page, showAllReviews]);

  return (
    <div className="my-8">
      {/* ✅ 리뷰 작성 폼 (버튼 클릭 시 표시) */}
      {showReviewForm && (
        <ReviewForm productId={productId} onReviewSubmit={loadReviews} />
      )}

      {/* ✅ 리뷰 목록 (로딩 상태) */}
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-40 rounded-md mb-2" />
        ))
      ) : reviews.length === 0 ? (
        <div className="text-gray-500 text-center mt-4">
          첫 리뷰를 작성해주세요!
        </div>
      ) : (
        <div className="flex flex-col items-center mt-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              review={review}
              onReviewUpdate={loadReviews}
            />
          ))}

          {/* ✅ "더보기" 버튼 (리뷰가 5개 이상일 경우) */}
          {hasMore && !showAllReviews && reviews.length >= 5 && (
            <Button
              className="w-full mt-4"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isLoading}
            >
              {isLoading ? "로딩 중..." : "더보기"}
            </Button>
          )}
        </div>
      )}

      {/* ✅ 리뷰 제목 & 리뷰 쓰기 버튼 */}
      <div className="flex justify-end gap-4 items-center mb-4">
        <Button
          variant="outline"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? "취소" : "리뷰 쓰기"}
        </Button>
        <Button variant="outline">
          <Link href="/reviewCommunity">모두 보기</Link>
        </Button>
      </div>
    </div>
  );
};
