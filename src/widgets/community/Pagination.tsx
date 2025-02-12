"use client";

import { Button } from "@/shared/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="border-none p-0"
      >
        <ChevronLeft
          size={16}
          className="hover:transition-all text-[#353535]"
        />
      </Button>
      <span className="px-2 py-1 border rounded-md text-gray-700 select-none">
        {currentPage} / {totalPages || 1}
      </span>
      <Button
        variant="outline"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="border-none p-0"
      >
        <ChevronRight size={16} className="transform" />
      </Button>
    </div>
  );
}
