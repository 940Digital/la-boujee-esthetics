import { photoBlur } from "./photo-blur";

/** next/image placeholder props for a photo: a tiny blurred preview while the real one loads. */
export function blurProps(src: string): { placeholder?: "blur"; blurDataURL?: string } {
  const data = photoBlur[src];
  return data ? { placeholder: "blur", blurDataURL: data } : {};
}
