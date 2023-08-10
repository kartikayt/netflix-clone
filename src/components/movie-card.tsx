import { useEffect, useRef, useState } from "react";
import { createImgUrl } from "../common/utils";
import PreviewModal from "./preview-modal";
import YouTube from "react-youtube";
import { fetchFromEndpoint } from "../common/api";
import { ENDPOINTS } from "../common/endpoints";

const CARD_WIDTH = 200;

export type MovieVideoResult<T> = {
  id: number;
  results: T;
  [k: string]: unknown;
};

export type MovieVideoInfo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
  [k: string]: unknown;
};

export default function MovieCard({
  poster_path,
  id,
  title,
}: {
  poster_path: string;
  id: number;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [videoInfo, setVideoInfo] = useState<MovieVideoInfo | null>(null);
  const movieCardref = useRef<HTMLSelectElement>(null);

  async function onMouseEnter(event: any) {
    const [videoInfo] = await fetchVideoInfo();
    setVideoInfo(videoInfo);
    fetchVideoInfo();
    setIsOpen(true);
  }

  async function fetchVideoInfo() {
    const response = await fetchFromEndpoint<
      MovieVideoResult<MovieVideoInfo[]>
    >(ENDPOINTS.MOVIE_VIDEO.replace("{movie_id}", id.toString()));

    return response.results.filter(
      (result) => result.site.toLowerCase() == "youtube",
    );
  }

  useEffect(() => {
    movieCardref.current?.addEventListener("mouseenter", onMouseEnter);
    () => movieCardref.current?.removeEventListener("mouseenter", onMouseEnter);
  }, []);

  function onClose(value: boolean) {
    setIsOpen(value);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <section
        ref={movieCardref}
        key={`${id}-${title}`}
        className="aspect-square flex-none overflow-hidden rounded-md"
      >
        <img
          loading="lazy"
          className="h-full w-full"
          src={createImgUrl(poster_path, CARD_WIDTH)}
          alt={title}
        />
      </section>
      <PreviewModal
        closeModal={closeModal}
        title=""
        checkOpen={isOpen}
        key={id}
        onClose={onClose}
      >
        <YouTube
          opts={{
            width: "450",
            playerVars: { autoplay: 1, playsinline: 1, controls: 0 },
          }}
          videoId={videoInfo?.key}
        />
      </PreviewModal>
    </>
  );
}
