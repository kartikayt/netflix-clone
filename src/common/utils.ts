export function createImgUrl(img_path: string, width: number) {
    return `${import.meta.env.VITE_IMAGE_URL}w${width}${img_path}`;
  }