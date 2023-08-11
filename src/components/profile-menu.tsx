import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import profileImage from "/user1.png";

export default function ProfileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const profileMenuContainer = useRef<HTMLElement>(null);
  const timerId = useRef(0);

  function onMouseEnter() {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    setShowMenu(true);
  }

  function onMouseExit() {
    timerId.current = setTimeout(() => {
      setShowMenu(false);
    }, 300);
  }

  useEffect(() => {
    profileMenuContainer.current?.addEventListener("mouseenter", onMouseEnter);
    profileMenuContainer.current?.addEventListener("mouseleave", onMouseExit);

    return () => {
      profileMenuContainer.current?.removeEventListener(
        "mouseenter",
        onMouseEnter,
      );
      profileMenuContainer.current?.removeEventListener(
        "mouseleave",
        onMouseExit,
      );
    };
  });

  return (
    <section ref={profileMenuContainer} className="relative">
      <section className="flex">
        <img className="h-9 w-9 rounded-md" src={profileImage} alt="User1" />
        <ChevronDownIcon
          style={{ strokeWidth: "0.2em" }}
          className={`h-6 w-6 transition-transform duration-200 ${
            showMenu ? "rotate-180" : ""
          }`}
        />
      </section>
      {showMenu ? (
        <ul className="absolute -left-16 top-[60px] flex w-[200px] flex-col justify-center gap-4 rounded-sm bg-dark px-4 ">
          <li>username</li>
          <li>Mange Profiles</li>
          <li>Transfer profiles</li>
          <li>Account</li>
          <li>Help Center</li>
          <li className="border-t border-t-gray-500 px-4">Signout</li>
        </ul>
      ) : null}
    </section>
  );
}
