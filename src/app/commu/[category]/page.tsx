"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchCommunityPosts } from "@/shared/api/community";
import { CommunityPost } from "@/shared/types/community";
import KakaoMap from "@/widgets/KaKaoMap/KaKaoMap";
import { categoryNames } from "@/shared/lib/communityUtils";
import CommunityPostList from "@/entities/community/ui/category/CommunityPostList";
import FilterSelect from "@/widgets/community/FilterSelect";
import { useCommunitySearch } from "@/features/community/hooks/useCommunitySearch";
import { useCommunityFilter } from "@/features/community/hooks/useCommunityFilter";
import SearchBar from "@/widgets/community/SearchBar";

export default function CommunityCategoryPage() {
  const params = useParams();
  const category = params?.category as string | undefined;
  const categoryName = category ? categoryNames[category] || category : "";

  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const fetchedPosts = await fetchCommunityPosts(category as string);
      setPosts(fetchedPosts);
      setLoading(false);
    };
    fetchPosts();
  }, [category]);

  const { searchTerm, setSearchTerm, filteredPosts } =
    useCommunitySearch(posts);
  const {
    filter,
    setFilter,
    filteredPosts: sortedPosts,
  } = useCommunityFilter(filteredPosts);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{categoryName}</h1>

      {category === "branches" && (
        <div className="w-full h-96 mb-6">
          <KakaoMap />
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        {/* branches 카테고리일 경우 정렬 옵션 */}
        {category === "branches" && (
          <FilterSelect
            filter={filter}
            setFilter={setFilter}
            options={[
              { value: "chain", label: "체인점" },
              { value: "special", label: "특약점" },
              { value: "store", label: "직영점" },
            ]}
          />
        )}
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">게시글을 불러오는 중...</p>
      ) : sortedPosts.length > 0 ? (
        <CommunityPostList posts={sortedPosts} category={category} />
      ) : (
        <p className="text-gray-500 text-center">등록된 게시글이 없습니다.</p>
      )}

      <div className="pt-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => console.log("검색:", searchTerm)}
        />
      </div>
    </div>
  );
}
