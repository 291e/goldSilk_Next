"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { useCommunityPagination } from "@/features/community/hooks/useCommunityPagination";
import Pagination from "@/widgets/community/Pagination";
import { cleanMapId, formatDate } from "@/shared/lib/communityUtils";
import { CommunityPost } from "@/shared/types/community";

interface CommunityPostListProps {
  posts: CommunityPost[];
  category: string | undefined;
}

export default function CommunityPostList({
  posts,
  category,
}: CommunityPostListProps) {
  const { currentPage, setCurrentPage, paginatedPosts, totalPages } =
    useCommunityPagination(posts, 10);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedPosts.map((post) => (
          <Card key={post.community_id} className="p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                <Link
                  href={`/community/${category}/${post.community_id}`}
                  className="hover:text-primary"
                >
                  {post.title}
                </Link>
              </CardTitle>
              {category === "branches" && (
                <p className="text-xs text-gray-500 mt-1">
                  {post.sub_type === "chain"
                    ? "체인점"
                    : post.sub_type === "special"
                      ? "특약점"
                      : "직영점"}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                {post.content.length > 50
                  ? `${post.content.slice(0, 50)}...`
                  : post.content}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {formatDate(post.created_at)}
              </p>
              {category === "branches" && post.map_id && (
                <iframe
                  src={cleanMapId(post.map_id)}
                  width="100%"
                  height="200"
                  style={{ border: 0, marginTop: "10px" }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
