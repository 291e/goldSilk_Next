"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

interface FilterSelectProps {
  filter: string | null;
  setFilter: (filter: string | null) => void;
  options: { value: string; label: string }[];
}

export default function FilterSelect({
  filter,
  setFilter,
  options,
}: FilterSelectProps) {
  return (
    <Select
      value={filter ?? "all"}
      onValueChange={(value) => setFilter(value === "all" ? null : value)}
    >
      <SelectTrigger className="w-full md:w-1/4">
        <SelectValue placeholder="정렬" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">전체</SelectItem> {/* ✅ "전체"를 all로 설정 */}
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
