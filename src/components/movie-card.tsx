import { useEffect, useRef, useState } from "react";
import { createImgUrl } from "../common/utils";
import PreviewModal from "./preview-modal";
import YouTube from "react-youtube";
import { MovieVideoInfo, fetchVideoInfo } from "../common/api";
import { PlayIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Position } from "../common/types";

const CARD_WIDTH = 200;

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
  const [position, setPosition] = useState<Position | null>();
  const [hidePoster, setHidePoster] = useState(false);

  async function onMouseEnter() {
    const [videoInfo] = await fetchVideoInfo(id.toString());

    let calculatedPosition = movieCardref.current?.getBoundingClientRect();
    let top = calculatedPosition?.top ?? 0 - 100;
    let left = (calculatedPosition?.left ?? 0) - 100;
    if (left < 0) {
      left = calculatedPosition?.left as number;
    }
    let totalWidth = left + 400;
    if (totalWidth > document.body.clientWidth) {
      left = left - (totalWidth - document.body.clientWidth);
    }
    setPosition({ top, left });

    setVideoInfo(videoInfo);
    setIsOpen(true);
  }

  useEffect(() => {
    movieCardref.current?.addEventListener("mouseenter", onMouseEnter);
    () => movieCardref.current?.removeEventListener("mouseenter", onMouseEnter);
  }, []);

  useEffect(() => {
    if (videoInfo?.key) {
      setTimeout(() => {
        setHidePoster(true);
      }, 1000);
    }
    if (!isOpen) {
      setHidePoster(false);
    }
  }, [videoInfo, isOpen]);

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
        position={position}
      >
        <section>
          <img
            src={createImgUrl(poster_path, 400)}
            alt="title"
            className={`${
              hidePoster ? "invisible h-0" : "visible h-full"
            } w-full`}
          />
          <YouTube
            opts={{
              width: "350",
              height: "200",
              playerVars: { autoplay: 1, playsinline: 1, controls: 0 },
            }}
            videoId={videoInfo?.key}
          />
          <section className="flex items-center justify-between p-6">
            <ul className="flex items-center justify-evenly gap-4">
              <li className="h-12 w-12">
                <button className="h-full w-full">
                  <PlayIcon />
                </button>
              </li>
              <li className="h-12 w-12 rounded-full border-2 border-gray-500 p-2 hover:border-white">
                <button className="h-full w-full">
                  <PlusIcon />
                </button>
              </li>
              <li className="h-12 w-12 rounded-full border-2 border-gray-500 p-2 hover:border-white">
                <button className="h-full w-full">
                  <HandThumbUpIcon />
                </button>
              </li>
              <li className="h-12 w-12 rounded-full border-2 border-gray-500 p-2 hover:border-white">
                <button className="h-full w-full">
                  <ChevronDownIcon />
                </button>
              </li>
            </ul>
          </section>
        </section>
      </PreviewModal>
    </>
  );
}
