"use client";

import { CommunityPost } from "@/shared/types/community";
import { useState } from "react";

export function useCommunitySearch(posts: CommunityPost[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = searchTerm
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  return { searchTerm, setSearchTerm, filteredPosts };
}
