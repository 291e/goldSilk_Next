"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
  Button,
} from "@/shared/ui";
import { useCommunityPosts } from "@/shared/hooks/useCommunity";
import { categories } from "@/shared/lib/communityUtils";

export default function CommunityPostList() {
  const { posts, loading } = useCommunityPosts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {loading
        ? Array.from({ length: categories.length }).map((_, index) => (
            <Card key={index} className="p-4">
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2" />
              </CardContent>
            </Card>
          ))
        : categories.map(({ name, type, href }) => {
            const categoryPosts = posts[type] || [];

            return (
              <Card key={href} className="p-0 sm:p-4">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg font-semibold">
                    {name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <ul className="space-y-2">
                    {categoryPosts.length > 0 ? (
                      categoryPosts.slice(0, 5).map((post) => (
                        <li
                          key={post.community_id}
                          className="border-b pb-2 text-xs sm:text-sm"
                        >
                          <Link
                            href={`/community/${post.type}/${post.community_id}`}
                            className="text-gray-700 hover:text-primary"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500 text-xs">
                        게시글이 없습니다.
                      </p>
                    )}
                  </ul>
                  <Button asChild variant={"outline"} className="mt-6 px-2">
                    <Link href={href}>더 보기</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
    </div>
  );
}
