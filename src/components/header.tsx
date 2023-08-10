import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Netflix_Logo_RGB.png";
export default function Header() {
  function isActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? "font-semibold text-white" : "";
  }

  return (
    <header className="border-b-2">
      <nav className="grid grid-cols-[140px_auto_200px] items-center py-1">
        <section className="px-4">
          <Link to="">
            <img src={logo} alt="NotAflix" />
          </Link>
        </section>
        <section className="align-self flex flex-row gap-4 text-sm text-gray-200">
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
        <section className="flex flex-row justify-end gap-4 px-4 text-lg">
          <NavLink to="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </NavLink>
          <NavLink to="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </NavLink>
          <NavLink to="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </NavLink>
        </section>
      </nav>
    </header>
  );
}
