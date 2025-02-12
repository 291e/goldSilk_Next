import { useState, useMemo } from "react";
import { CommunityPost } from "@/shared/types/community";

export function useCommunityFilter(posts: CommunityPost[]) {
  const [filter, setFilter] = useState<string | null>(null);

  // ✅ 필터 적용 (같은 필터 한 번 더 누르면 해제)
  const handleFilterChange = (value: string | null) => {
    setFilter((prevFilter) => (prevFilter === value ? null : value));
  };

  // ✅ 필터링된 게시글 반환
  const filteredPosts = useMemo(() => {
    if (!filter) return posts; // 필터 해제 시 모든 데이터 반환
    return posts.filter((post) => post.sub_type === filter);
  }, [filter, posts]);

  return { filter, setFilter: handleFilterChange, filteredPosts };
}
