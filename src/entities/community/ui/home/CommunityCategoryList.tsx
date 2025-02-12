"use client";

import Link from "next/link";
import { Button } from "@/shared/ui";
import { categories } from "@/shared/lib/communityUtils";

export default function CommunityCategoryList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {categories.map(({ name, href }) => (
        <Button
          key={href}
          asChild
          variant="outline"
          className="text-lg font-semibold"
        >
          <Link href={href}>{name}</Link>
        </Button>
      ))}
    </div>
  );
}
