import { useEffect, useRef, useState } from "react";
import { Movie, Movies, fetchFromEndpoint } from "../common/api";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import PageIndicator from "./page-indicator";
import MovieCard from "./movie-card";

type RowProp = {
  endpoint: string;
  title: string;
};

const CARD_WIDTH: number = 200;

export default function ContentRow({ title, endpoint }: RowProp) {
  const [rowContent, setrowContent] = useState<Movie[]>([]);
  const [translateX, settranslateX] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const sliderRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLSelectElement>(null);
  const widthCalc = useRef(0);

  const checkDisabledNext = currentPage === pagesCount - 1;
  const checkDisabledPrev = currentPage === 0;

  async function fetchRow() {
    const popularMovies = await fetchFromEndpoint<Movies<Movie[]>>(endpoint);
    setrowContent(popularMovies.results);
  }

  function getTranslatedXVal() {
    let translateX = 0;
    if (sliderRef.current) {
      translateX =
        ((widthCalc.current * CARD_WIDTH) / sliderRef.current.clientWidth) *
        100;
    }
    return translateX;
  }

  function nextClick() {
    if (sliderRef.current) {
      let updatedVal = translateX - getTranslatedXVal();
      sliderRef.current.style.transform = `translateX(${updatedVal}%)`;
      settranslateX(updatedVal);
      setCurrentPage(currentPage + 1);
    }
  }

  function prevClick() {
    if (sliderRef.current) {
      let updatedVal = translateX + getTranslatedXVal();
      sliderRef.current.style.transform = `translateX(${updatedVal}%)`;
      settranslateX(updatedVal);
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    if (rowContent?.length) {
      if (containerRef.current) {
        widthCalc.current = Math.floor(
          containerRef.current.clientWidth / CARD_WIDTH,
        );
      }
      setPagesCount(Math.ceil(rowContent.length / widthCalc.current));
    }
  }, [rowContent.length]);

  useEffect(() => {
    fetchRow();
  }, []);

  return (
    <section className="row-container">
      <h1 className="px-5 py-2 font-bold">{title}</h1>
      <PageIndicator pagesCount={pagesCount} currentPage={currentPage} />
      <section
        className="relative mb-4 flex flex-nowrap gap-3"
        ref={containerRef}
      >
        {!checkDisabledPrev ? (
          <button
            onClick={prevClick}
            className="absolute z-[1] h-full w-10 bg-black/50 opacity-0 transition-opacity duration-300 ease-in"
          >
            <ChevronLeftIcon />
          </button>
        ) : null}

        {!checkDisabledNext ? (
          <button
            onClick={nextClick}
            className="absolute right-0 z-[1] h-full w-10 bg-black/50 opacity-0 transition-opacity duration-300 ease-in"
          >
            <ChevronRightIcon />
          </button>
        ) : null}

        <section
          className="flex gap-2 transition-transform duration-700 ease-linear"
          ref={sliderRef}
        >
          {rowContent?.map((movie_data) => {
            return <MovieCard key={movie_data.id} {...movie_data} />;
          })}
        </section>
      </section>
    </section>
  );
}
