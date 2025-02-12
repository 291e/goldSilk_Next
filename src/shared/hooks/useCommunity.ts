import { useEffect, useState } from "react";
import { fetchCommunityPosts } from "@/shared/api/community";
import { CommunityPost } from "@/shared/types/community";

export function useCommunityPosts() {
  const [posts, setPosts] = useState<Record<string, CommunityPost[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchCommunityPosts();
        const categorizedPosts: Record<string, CommunityPost[]> = {};

        data.forEach((post) => {
          if (!categorizedPosts[post.type]) {
            categorizedPosts[post.type] = [];
          }
          categorizedPosts[post.type].push(post);
        });

        setPosts(categorizedPosts);
      } catch (error) {
        console.error("❌ 게시글 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { posts, loading };
}
