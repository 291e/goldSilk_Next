"use client";

import React, { useState } from "react";
import Logo from "@/shared/assets/logo.jpg";
import Image from "next/image";
import { Review } from "@/shared/types/reviews";
import {
  deleteReview,
  updateReview,
} from "@/features/review/services/reviewApi";
import { Button } from "@/shared/ui/shadCn/button";
import { Textarea } from "@/shared/ui/shadCn/textarea";
import { StarRating } from "@/entities/product/ui/review/StarRating";

export interface ReviewCardProps {
  review: Review;
  onReviewUpdate: () => void;
}

export const ReviewCard = ({ review, onReviewUpdate }: ReviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [loading, setLoading] = useState(false);

  const imageUrl = review.image_url
    ? `https://goldsilk.net/images/review/${review.image_url}`
    : Logo; // 로고 이미지로 대체

  /** 리뷰 수정 */
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("rating", rating.toString());
      formData.append("comment", comment);
      await updateReview(Number(review.review_id), formData);
      setIsEditing(false);
      onReviewUpdate(); // 리뷰 목록 갱신
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  /** 리뷰 삭제 */
  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setLoading(true);
    try {
      await deleteReview(Number(review.review_id));
      onReviewUpdate(); // 리뷰 목록 갱신
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border flex flex-col items-center gap-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white h-80 max-w-80">
      <div className="overflow-hidden relative min-h-[140px] size-[140px] rounded-full">
        <Image
          src={imageUrl}
          width={0} // 원하는 가로 크기
          height={0} // 원하는 세로 크기
          alt="Review"
          className="w-full h-full object-cover absolute"
          unoptimized // 외부 이미지 최적화 방지 (필요 시 추가)
        />
      </div>

      {isEditing ? (
        /** ✅ 수정 모드 UI */
        <div className="flex flex-col gap-2 w-full">
          <StarRating rating={rating} onChange={setRating} />
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between gap-2">
            <Button onClick={() => setIsEditing(false)}>취소</Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? "저장 중..." : "저장"}
            </Button>
          </div>
        </div>
      ) : (
        /** ✅ 기본 리뷰 UI */
        <div className="flex flex-col gap-2 w-full">
          <span className="font-semibold line-clamp-1">{review.title}</span>
          <span className="text-gray-600 line-clamp-2 text-sm">
            {review.comment}
          </span>
          <span className="text-yellow-500 text-sm">
            ⭐ {review.rating} / 5
          </span>
          <span className="text-sm text-gray-400">- {review.author}</span>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              수정
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
