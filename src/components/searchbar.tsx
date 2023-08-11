import React from "react";
import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useEffect, useRef, useState } from "react";
export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const strokeWidth = { strokeWidth: "0.2rem" };
  const inputRef = useRef<HTMLInputElement>(null);

  function outsideClick(event: globalThis.MouseEvent) {
    if ((event.target as HTMLInputElement).id !== "searchbar") {
      setOpen(false);
    }
  }

  function toggleSearch(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (!open) {
      inputRef.current?.focus();
    }
    setOpen(!open);
  }

  useEffect(() => {
    if (open) {
      window.addEventListener("click", outsideClick);
    }

    return () => {
      window.removeEventListener("click", outsideClick);
    };
  }, [open]);

  return (
    <section className="item-center flex w-[300px] justify-end overflow-hidden">
      <button className={`h-8 ${!open ? "w-8" : "w-0"}`} onClick={toggleSearch}>
        <SearchIcon style={strokeWidth} />
      </button>
      <section
        className={`${
          open ? "animate-slide-rtl w-full border border-white" : "w-0"
        } flex items-center gap-2 bg-dark`}
      >
        <button className="h-8 w-8">
          <SearchIcon style={strokeWidth} />
        </button>
        <input
          ref={inputRef}
          className="w-full bg-dark outline-none"
          type="text"
          name="searchbar"
          id="searchbar"
        />
      </section>
    </section>
  );
}
