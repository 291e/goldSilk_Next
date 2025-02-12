"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { productCategories } from "@/shared/lib/categoryUtils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CategoryList() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (type: string) => {
    setOpenCategory((prev) => (prev === type ? null : type));
  };

  return (
    <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {productCategories.map(({ name, type, subCategories }) => (
        <Card key={type} className="p-4 relative">
          <CardHeader>
            <CardTitle>
              <button
                className="flex justify-between items-center w-full text-lg font-semibold"
                onClick={() => toggleCategory(type)}
              >
                {name}
                {subCategories && <ChevronDown size={18} className="ml-2" />}
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subCategories ? (
              <div
                className={`transition-all overflow-hidden ${openCategory === type ? "h-auto" : "h-0"}`}
              >
                <ul className="mt-2 space-y-2">
                  {subCategories.map(({ name, type }) => (
                    <li key={type}>
                      <Link
                        href={`/category/${type}`}
                        className="block text-gray-700 hover:text-primary"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                href={`/category/${type}`}
                className="block text-gray-700 hover:text-primary"
              >
                더 보기
              </Link>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
