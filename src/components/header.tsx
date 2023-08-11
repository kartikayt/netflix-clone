import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Netflix_Logo_RGB.png";
import { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import SearchBar from "./searchbar";
import ProfileMenu from "./profile-menu";

export default function Header() {
  const [fixed, setFixed] = useState(false);

  function isActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? "font-semibold text-white" : "";
  }

  function onWindowScroll() {
    if (window.scrollY > 8) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll);
    () => window.removeEventListener("scroll", onWindowScroll);
  }, []);

  return (
    <header
      className={`z-10 pr-16 ${
        fixed ? "fixed top-0 bg-dark" : "relative bg-transparent"
      } w-full transition-colors duration-300 ease-linear`}
    >
      <nav className="grid grid-cols-[140px_auto_auto] items-center py-1 font-normal">
        <section className="h-12 px-4">
          <Link to="">
            <img src={logo} alt="NotAflix" />
          </Link>
        </section>
        <section className="align-self flex flex-row gap-4 text-base text-gray-200">
          <NavLink className={isActiveLink} to="">
            Home
          </NavLink>

          <NavLink className={isActiveLink} to="tvshow">
            TV Show
          </NavLink>

          <NavLink className={isActiveLink} to="movies">
            Movies
          </NavLink>

          <NavLink className={isActiveLink} to="newpopular">
            New & Popular
          </NavLink>

          <NavLink className={isActiveLink} to="mylist">
            My List
          </NavLink>

          <NavLink className={isActiveLink} to="language">
            Browse By Language
          </NavLink>
        </section>
        <section className="flex flex-row items-center justify-end gap-4 px-4 text-lg">
          <BellIcon className="h-8 w-8" />
          <SearchBar />
          <ProfileMenu />
        </section>
      </nav>
    </header>
  );
}
