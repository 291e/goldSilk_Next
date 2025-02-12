"use client";

import React, { useEffect, useState } from "react";
import { createReview } from "@/shared/api/reviews";
import { Button } from "@/shared/ui/shadCn/button";
import { Input } from "@/shared/ui/shadCn/input";
import { Textarea } from "@/shared/ui/shadCn/textarea";
import { Label } from "@/shared/ui/shadCn/label";
import { StarRating } from "./StarRating";

interface ReviewFormProps {
  productId: string;
  onReviewSubmit: () => void;
}

export const ReviewForm = ({ productId, onReviewSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("productId", productId.toString());
      formData.append("rating", rating.toString());
      formData.append("comment", comment);
      if (image) formData.append("image", image);

      await createReview(formData);
      setRating(0);
      setComment("");
      setImage(null);
      setPreview(null); // ✅ 미리보기도 초기화
      onReviewSubmit(); // 리뷰 목록 갱신
    } catch (error) {
      console.error("리뷰 작성 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 border rounded-md shadow-md"
    >
      <Label>별점</Label>
      <StarRating rating={rating} onChange={setRating} />

      <Label>리뷰 내용</Label>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="상품에 대한 후기를 작성해주세요."
        required
      />

      <Label>이미지 업로드</Label>
      <Input type="file" accept="image/*" onChange={handleImageChange} />

      {preview && (
        <img
          src={preview}
          alt="리뷰 이미지 미리보기"
          className="w-32 h-32 object-cover rounded-md"
        />
      )}

      <Button type="submit" disabled={loading} className="mt-2">
        {loading ? "등록 중..." : "리뷰 등록"}
      </Button>
    </form>
  );
};
