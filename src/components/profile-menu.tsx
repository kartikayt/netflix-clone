import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../common/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  useProfilesContext,
  useProfilesDispatchContext,
} from "./profiles-context";
import { UserProfile } from "firebase/auth";

export default function ProfileMenu() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const profileMenuContainer = useRef<HTMLElement>(null);
  const timerId = useRef(0);

  const userProfiles = useProfilesContext();
  const currentProfile = userProfiles?.profiles.find(
    (profile) => profile.id === userProfiles.selectedProfileId,
  );

  const dispatch = useProfilesDispatchContext();

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

  async function signOutNetflix() {
    await signOut();
    dispatch({ type: "load", payload: null });
    navigate("/login");
  }

  function loadProfile(profile: UserProfile) {
    dispatch({ type: "current", payload: profile });
    window.location.reload();
  }

  return (
    <section ref={profileMenuContainer} className="relative">
      <section className="flex">
        <img
          className="h-9 w-9 rounded-md"
          src={currentProfile?.imageUrl}
          alt="User1"
        />
        <ChevronDownIcon
          style={{ strokeWidth: "0.2em" }}
          className={`h-6 w-6 transition-transform duration-200 ${
            showMenu ? "rotate-180" : ""
          }`}
        />
      </section>
      {showMenu ? (
        <ul className="absolute -left-16 top-[60px] flex w-[200px] flex-col justify-center gap-4 rounded-sm bg-dark px-4 ">
          {userProfiles?.profiles
            .filter((profile) => profile.id !== currentProfile?.id)
            ?.map((profile) => (
              <li
                className="flex cursor-pointer items-center gap-2  hover:underline"
                key={profile.id}
                onClick={() => loadProfile(profile)}
              >
                <img
                  className="h-8 w-8"
                  src={profile.imageUrl}
                  alt={profile.name}
                />
                {profile.name}
              </li>
            ))}
          <li>{currentProfile?.name}</li>
          <li
            className={
              userProfiles?.profiles.length ?? 0 > 1
                ? "border-t border-t-gray-500 px-4"
                : ""
            }
          >
            <Link className="underline" to="/manageprofiles">
              Mange Profiles
            </Link>
          </li>
          <li>Transfer profiles</li>
          <li>Account</li>
          <li>Help Center</li>
          <li
            onClick={signOutNetflix}
            className="border-t border-t-gray-500 px-4"
          >
            Signout
          </li>
        </ul>
      ) : null}
    </section>
  );
}
