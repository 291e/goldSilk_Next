"use client";

import React, { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { metaStyle } from "@/shared/assets/productDetail";
import Image from "next/image";

interface AIFaceSynthesisProps {
  selectedImage: string;
  onImageUpdate: (newImage: string) => void;
}

export const AIFaceSynthesis = ({
  selectedImage,
  onImageUpdate,
}: AIFaceSynthesisProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // 미리보기 설정
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("얼굴 사진을 업로드해주세요.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("face_file", file);

      const imageResponse = await fetch(
        `https://goldsilk.net/images/${selectedImage}`
      );

      if (!imageResponse.ok) {
        throw new Error("이미지 불러오기 실패");
      }

      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], "target_image.jpg", {
        type: "image/jpeg",
      });
      formData.append("target_file", imageFile);

      const response = await fetch("https://goldsilk.net/face", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      if (responseData.image_base64) {
        const base64Image = `data:image/png;base64,${responseData.image_base64}`;
        onImageUpdate(base64Image);
      }
    } catch (error) {
      console.error("🚨 합성 오류:", error);
      alert("AI 합성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-synthesis mt-4 flex items-center justify-between h-28 max-w-xs gap-4">
      <label
        htmlFor="file-upload"
        className="aspect-square w-28 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-100 relative"
      >
        {loading ? (
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        ) : preview ? (
          <Image
            src={preview}
            alt="Uploaded"
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 w-full h-full rounded-md">
            <ImagePlus className="w-12 h-12 text-gray-400" />
            <span className="mt-2 text-gray-500 text-sm">나의 얼굴 이미지</span>
          </div>
        )}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <div className="flex flex-col justify-center gap-4">
        <Button onClick={handleSubmit} disabled={loading} className="w-40 h-10">
          {loading ? "처리 중..." : "AI 한복 입어보기"}
        </Button>
        <Image src={metaStyle} alt="Meta" width={150} height={0} />
      </div>
    </div>
  );
};
