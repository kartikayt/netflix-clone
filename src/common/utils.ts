type dimension = "width" | "original";

export function createImgUrl(
  img_path: string,
  width: number,
  type: dimension = "width",
) {
  return type === "width"
    ? `${import.meta.env.VITE_IMAGE_URL}w${width}${img_path}`
    : `${import.meta.env.VITE_IMAGE_URL}${type}${img_path}`;
}
