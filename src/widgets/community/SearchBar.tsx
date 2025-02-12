"use client";

import { Input, Button } from "@/shared/ui";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  onSearch,
}: SearchBarProps) {
  return (
    <div className="flex items-center w-full">
      <Input
        type="text"
        placeholder="제목 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 rounded-r-none text-xs sm:text-sm"
      />
      <Button
        variant="default"
        className="rounded-l-none text-xs sm:text-sm"
        onClick={onSearch}
      >
        검색
      </Button>
    </div>
  );
}
