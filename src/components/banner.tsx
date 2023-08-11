import { useEffect, useState } from "react";
import {
  Movie,
  MovieVideoInfo,
  Movies,
  fetchFromEndpoint,
  fetchVideoInfo,
} from "../common/api";
import { ENDPOINTS } from "../common/endpoints";
import { createImgUrl } from "../common/utils";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Banner() {
  const [random, setRandom] = useState<Movie>();
  const [videoInfo, setVideoInfo] = useState<MovieVideoInfo>();
  const [hidePoster, setHidePoster] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const options: YouTubeProps["opts"] = {
    width: document.body.clientWidth,
    height: "800",
    playerVars: { autoplay: 1, playsinline: 1, controls: 0 },
  };

  function getRandomIndex(last: number) {
    return Math.floor(Math.random() * (last - 1));
  }

  async function fetchPopularMovies() {
    const response = await fetchFromEndpoint<Movies<Movie[]>>(
      ENDPOINTS.MOVIES_POPULAR,
    );
    const filteredMovies = response.results.filter(
      (movie) => movie.backdrop_path,
    );
    const randomSelection =
      filteredMovies[getRandomIndex(filteredMovies.length)];
    setRandom(randomSelection);

    const videoInfo = await fetchVideoInfo(randomSelection.id.toString());

    setVideoInfo(videoInfo[0]);
    setTimeout(() => {
      setHidePoster(true);
    }, 1000);
  }

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  function onStateChange(event: YouTubeEvent<number>) {
    if (event.data === 0) {
      setHidePoster(false);
      setShowBack(true);
    } else if (event.data === 1) {
      setShowBack(true);
      setHidePoster(false);
    }
  }
  return (
    <section className="relative aspect-video h-[400px] w-full">
      {/* <img
        src={createImgUrl(random?.backdrop_path as string, 0, "original")}
        alt={random?.title}
        className={hidePoster ? `invisible h-0` : `visible h-full w-full`}
      /> */}
      <YouTube
        videoId={videoInfo?.key}
        id="banner-video"
        opts={options}
        className={`${
          hidePoster ? "visible h-full" : "invisible h-0"
        } absolute -mt-36`}
        // onStateChange={}
      />
      {/* {showBack ? (
        <section className="z-1 absolute left-0 top-0 h-full w-full bg-dark/60"></section>
      ) : null} */}
      <section className="absolute bottom-16 z-[2] ml-16 flex max-w-sm flex-col gap-2">
        <h2 className="text-6xl">{random?.title}</h2>
        <p className="line-clamp-3 text-sm">{random?.overview}</p>
        <section className="flex gap-2">
          <button className="flex w-[100px] items-center rounded-md bg-white p-2 text-dark">
            <PlayCircleIcon className="h-8 w-8" /> <span>Play</span>
          </button>
          <button className="flex w-[100px] items-center rounded-md bg-zinc-400 p-2 text-dark">
            <InformationCircleIcon /> <span>More Info</span>
          </button>
        </section>
      </section>
    </section>
  );
}
