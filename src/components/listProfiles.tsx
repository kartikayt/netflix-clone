import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
import PlusCircle from "@heroicons/react/24/solid/PlusCircleIcon";
import PreviewModal from "./preview-modal";

export default function ListProfiles({ edit }: { edit: boolean }) {
  const heading = !edit ? "Who's watching?" : "Manage Profiles";
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);

  const navigate = useNavigate();

  function manageProfiles() {
    navigate("/manageprofiles");
  }

  function closeEditor() {
    setIsProfileEditorOpen(false);
  }

  function openEditor() {
    setIsProfileEditorOpen(true);
  }

  return (
    <>
      <h1 className="mb-8 text-5xl">{heading}</h1>
      <section className="flex gap-4">
        <ProfileCard onEditClick={openEditor} edit={edit} />
        <ProfileCard onEditClick={openEditor} edit={edit} />
        <ProfileCard onEditClick={openEditor} edit={edit} />
        <ProfileCard onEditClick={openEditor} edit={edit} />
        <AddProfile />
      </section>
      <section></section>
      {edit ? (
        <>
          <ProfileButton>Done</ProfileButton>
          <EditProfile
            edit={edit}
            onClose={closeEditor}
            checkOpen={isProfileEditorOpen}
            title=""
          />
        </>
      ) : (
        <ProfileButton
          onClick={manageProfiles}
          className="mt-8"
          buttonType="secondary"
        >
          Manage profile
        </ProfileButton>
      )}
    </>
  );
}

function ProfileButton({
  buttonType = "primary",
  ...props
}: {
  buttonType?: "primary" | "secondary";
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${
        buttonType === "primary"
          ? "bg-gray-100 text-dark hover:bg-netflixRed"
          : "border border-white text-gray-400 hover:text-white"
      } px-4 py-2 text-xl ${props.className}`}
    >
      {props.children}
    </button>
  );
}

function ProfileCard({
  edit,
  onEditClick,
}: {
  edit: boolean;
  onEditClick: () => void;
}) {
  return (
    <section className="flex cursor-pointer flex-col place-items-center gap-2 text-gray-400 hover:text-white">
      <section className="relative h-[10vw] max-h-[200px] min-h-[84px] w-[10vw] min-w-[84px] max-w-[200px] overflow-hidden rounded-md hover:border-4 hover:border-gray-100">
        <img src="/user1.png" alt="User Profile" />
        {edit ? (
          <button
            onClick={onEditClick}
            className="absolute inset-0 grid place-items-center bg-black/50"
          >
            <PencilIcon className="w-[25%] text-white" />
          </button>
        ) : null}
      </section>
      <h1 className="text-xl">profile name</h1>
    </section>
  );
}

function AddProfile() {
  return (
    <section className="cusor-pointer flex flex-col place-items-center">
      <button className="relative grid h-[10vw] max-h-[200px] min-h-[84px] w-[10vw] min-w-[84px] max-w-[200px] place-items-center overflow-hidden rounded-md hover:border-4 hover:border-gray-100">
        <PlusCircle className="w-[75%]" />
      </button>
    </section>
  );
}

function EditProfile(props: {
  checkOpen: boolean;
  onClose: (value: boolean) => void;
  title: string;
  edit?: boolean;
}) {
  const heading = props.edit ? "Edit Profile" : "Add Profile";

  function cancelEditor() {
    props.onClose(false);
  }

  return (
    <PreviewModal {...props}>
      <section className="h-screen w-screen">
        <section className="mx-auto my-16 max-w-4xl">
          <h1 className="mb-4 text-6xl text-white">{heading}</h1>
          <section className="grid grid-cols-[200px_auto] gap-4 border-b border-t p-4 text-gray-100 ">
            <section className="aspect-square overflow-hidden rounded-md">
              <img src="/user2.png" alt="User" />
            </section>
            <section>
              <input
                type="text"
                placeholder="Enter Profile Name"
                className="w-full bg-zinc-500 p-2 outline-none"
              />
            </section>
            <section className="mt-8 flex gap-4">
              <ProfileButton>Save</ProfileButton>
              <ProfileButton onClick={cancelEditor} buttonType="secondary">
                Cancel
              </ProfileButton>
            </section>
          </section>
        </section>
      </section>
    </PreviewModal>
  );
}
