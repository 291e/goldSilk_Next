"use client";

import { useParams } from "next/navigation";

import CommentSection from "@/features/community/ui/CommentSection";
import { Skeleton } from "@/shared/ui";
import { useCommunityPost } from "@/features/community/hooks/useCommunityPost";
import PostContent from "@/entities/community/ui/detail/PostContent";
import PostNavigation from "@/entities/community/ui/detail/PostNavigation";

export default function CommunityPostPage() {
  const params = useParams();
  const category = params?.category as string;
  const postId = params?.post_id as string;
  const { post, posts, loading } = useCommunityPost(category, postId);

  if (loading)
    return (
      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-6" />
        <Skeleton className="h-48 w-full mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    );

  if (!post)
    return (
      <div className="text-center py-10 text-muted-foreground">
        게시글을 불러오는 중...
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-8 max-w-3xl">
      <PostContent post={post} category={category} />
      <CommentSection communityId={post.community_id} />
      <PostNavigation
        category={category}
        postId={post.community_id}
        posts={posts}
      />
    </div>
  );
}
