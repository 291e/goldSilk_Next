"use client";

import React from "react";
import { Card, CardContent } from "@/shared/ui/shadCn/card";
import { Button } from "@/shared/ui/shadCn/button";
import Image, { StaticImageData } from "next/image";
import "@/shared/ui/globals.css";
import Link from "next/link";

interface InfoCardProps {
  title: string;
  image: { src: StaticImageData; alt: string };
  description: string;
  link: string;
}

export const InfoCard = ({
  title,
  image,
  description,
  link,
}: InfoCardProps) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden max-w-[475px] mx-auto">
      <CardContent className="p-0">
        <Link className="relative flex justify-center" href={link}>
          <Image
            src={image.src}
            alt={image.alt}
            width={0}
            height={0}
            className="rounded-lg hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
          />
          <div className="absolute self-end flex flex-col items-center font-outline px-2">
            <span className="text-base lg:text-xl font-bold mb-2 text-white">
              {title}
            </span>
            <p className="text-sm lg:text-base text-white mb-4 text-center">
              {description}
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
