import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/shared/ui";
import {
  formatDate,
  cleanMapId,
  getCategoryName,
} from "@/shared/lib/communityUtils";
import { CommunityPost } from "@/shared/types/community";
import { Separator } from "@radix-ui/react-select";

export default function PostContent({
  post,
  category,
}: {
  post: CommunityPost;
  category: string;
}) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
        <div className="text-gray-500 text-sm flex items-center gap-3 mt-2">
          <Badge variant="secondary">{getCategoryName(category)}</Badge>
          <span>조회수 {post.view_count}</span>
          <span>작성일 {formatDate(post.created_at)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="text-gray-800 leading-relaxed">{post.content}</div>

        {/* 이미지 갤러리 */}
        {post.images && post.images.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {post.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`이미지 ${index + 1}`}
                width={300}
                height={200}
                className="rounded-md shadow-md"
              />
            ))}
          </div>
        )}

        {/* 체인점 안내일 경우 지도 표시 */}
        {category === "branches" && post.map_id && (
          <div className="mt-8">
            <iframe
              src={cleanMapId(post.map_id)}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-md shadow-md"
            ></iframe>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
