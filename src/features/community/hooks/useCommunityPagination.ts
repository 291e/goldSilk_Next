"use client";

import { CommunityPost } from "@/shared/types/community";
import { useState } from "react";

export function useCommunityPagination(
  posts: CommunityPost[],
  postsPerPage: number
) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginatedPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return { currentPage, setCurrentPage, paginatedPosts, totalPages };
}
