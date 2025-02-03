import { StaticImageData } from "next/image";

export interface Banner {
  id: number | string;
  image: { src: StaticImageData; alt: string };
  title: string;
  link: string;
}
