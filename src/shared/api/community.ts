import axiosInstance from "./axiosInstance";
import {
  CommunityPost,
  CreateCommunityRequest,
  UpdateCommunityRequest,
  CommentRequest,
} from "@/shared/types/community";

/** 모든 게시글 조회 */
export async function fetchCommunityPosts(
  type?: string
): Promise<CommunityPost[]> {
  const { data } = await axiosInstance.get("/community", { params: { type } });
  return data;
}

/** 특정 게시글 조회 */
export async function fetchCommunityPostById(
  communityId: number
): Promise<CommunityPost> {
  const { data } = await axiosInstance.get(`/community/${communityId}`);
  return data;
}

/** 게시글 작성 (이미지 포함) */
export async function createCommunityPost(formData: FormData) {
  const { data } = await axiosInstance.post("/community", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

/** 게시글 수정 (이미지 포함) */
export async function updateCommunityPost(
  communityId: number,
  formData: FormData
) {
  const { data } = await axiosInstance.put(
    `/community/${communityId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

/** 게시글 삭제 */
export async function deleteCommunityPost(communityId: number) {
  const { data } = await axiosInstance.delete(`/community/${communityId}`);
  return data;
}

/** 댓글 작성 */
export async function addComment(communityId: number, comment: CommentRequest) {
  const { data } = await axiosInstance.post(
    `/community/${communityId}/comments`,
    comment
  );
  return data;
}

/** 게시글 신고 */
export async function reportPost(communityId: number) {
  const { data } = await axiosInstance.put(`/community/${communityId}/report`);
  return data;
}

/** 이벤트 참여 */
export async function participateInEvent(eventId: number) {
  const { data } = await axiosInstance.post(
    `/community/${eventId}/participate`
  );
  return data;
}
