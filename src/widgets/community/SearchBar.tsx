"use client";

import { Input, Button } from "@/shared/ui";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  return (
    <div className="flex items-center mt-6">
      <Input
        type="text"
        placeholder="제목 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 rounded-r-none"
      />
      <Button variant="default" className="rounded-l-none">
        검색
      </Button>
    </div>
  );
}
