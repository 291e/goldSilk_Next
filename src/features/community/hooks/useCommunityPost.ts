import { useState, useEffect } from "react";
import { CommunityPost } from "@/shared/types/community";
import { fetchCommunityPostById, fetchCommunityPosts } from "@/shared/api";

export function useCommunityPost(category: string, postId: string) {
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setPosts([]);
        const data = await fetchCommunityPostById(Number(postId));
        setPost(data);

        const postList = await fetchCommunityPosts(category);
        setPosts(postList);
      } catch (error) {
        console.error("❌ 게시글 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId, category]);

  return { post, posts, loading };
}
