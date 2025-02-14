"use client";

import { useEffect, useState } from "react";
import { addComment } from "@/shared/api/community";
import { CommentRequest } from "@/shared/types/community";

interface CommentSectionProps {
  communityId: number;
}

export default function CommentSection({ communityId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentRequest[]>([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    // 댓글 데이터 가져오는 API 호출 (추가 필요)
  }, []);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      await addComment(communityId, { content: commentText });
      setCommentText("");
      // ✅ 댓글 목록 다시 불러오기 (추가 필요)
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">댓글</h3>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="border-b pb-2">
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>

      {/* 댓글 입력 */}
      <div className="mt-4 flex">
        <input
          type="text"
          className="border p-2 flex-1 rounded-md rounded-r-none"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <button
          className="bg-[#353535] text-white px-4 py-2 rounded-md rounded-l-none"
          onClick={handleCommentSubmit}
        >
          작성
        </button>
      </div>
    </div>
  );
}
