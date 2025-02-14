import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { ArrowDownFromLine, ArrowUpFromLine } from "lucide-react";
import { CommunityPost } from "@/shared/types/community";
import { useMemo } from "react";

export default function PostNavigation({
  category,
  postId,
  posts,
}: {
  category: string;
  postId: number;
  posts: CommunityPost[];
}) {
  const router = useRouter();

  const postIndex = useMemo(
    () => posts.findIndex((p) => p.community_id === Number(postId)),
    [posts, postId]
  );
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  const handleNavigation = (targetPostId: number) => {
    router.push(`/community/${category}/${targetPostId}`);
  };

  return (
    <div className="mt-10 flex flex-col items-start gap-4">
      <Button
        variant="outline"
        onClick={() => router.push(`/community/${category}`)}
      >
        목록
      </Button>
      <div className="w-full flex flex-col gap-6 text-gray-600 text-sm items-start">
        {prevPost ? (
          <Button
            variant="ghost"
            onClick={() => handleNavigation(prevPost.community_id)}
          >
            <ArrowUpFromLine size={16} />
            <span className="ml-2">{prevPost.title}</span>
          </Button>
        ) : (
          <p className="text-gray-400">이전 글이 없습니다.</p>
        )}
        {nextPost ? (
          <Button
            variant="ghost"
            onClick={() => handleNavigation(nextPost.community_id)}
          >
            <ArrowDownFromLine size={16} />
            <span className="ml-2">{nextPost.title}</span>
          </Button>
        ) : (
          <p className="text-gray-400">다음 글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
