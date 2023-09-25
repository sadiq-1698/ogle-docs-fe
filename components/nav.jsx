"use client";

import "../styles/globals.css";
import Modal from "./modal/modal";
import Lock from "@/elements/lock";
import { useState, useEffect } from "react";
import ShareDocument from "./modal/share-doc";
import useModal from "@/elements/hooks/useModal";
import ProfileContainer from "./auth/profile-container";
import getProfileLetter from "@/utils/auth/get-profile-letter";

export default function Nav({ children, share, document }) {
  const modalUtils = useModal();
  const { isOpen, component, toggleModal } = modalUtils;

  const [showProfile, setShowProfile] = useState(false);
  const [profileLtter, setProfileLetter] = useState("");

  const shareProps = {
    ...modalUtils,
    ...document,
  };

  const handleShareClick = () => {
    toggleModal({
      modalStyle: {},
      shouldOpenModal: true,
      component: <ShareDocument {...shareProps} />,
    });
  };

  useEffect(() => {
    const profLetter = getProfileLetter();
    setProfileLetter(profLetter);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md h-14 p-2 flex items-center justify-between z-50">
      {children}
      <div className="flex items-center">
        {share ? (
          <button
            onClick={() => handleShareClick()}
            className="flex items-center bg-blue-2 rounded-3xl pl-2.5 pr-6 py-1 hover:shadow-search"
          >
            <Lock />
            <span className="ml-1.5 font-semibold text-sm">Share</span>
          </button>
        ) : (
          <></>
        )}

        <div className="nav-profile cursor-pointer relative">
          <div
            onClick={() => setShowProfile((s) => !s)}
            className="h-9 w-9 bg-red-800 rounded-full mx-3 flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm">{profileLtter}</span>
          </div>
          {showProfile ? (
            <ProfileContainer
              profileLtter={profileLtter}
              setShowProfile={setShowProfile}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      {isOpen && <Modal>{component}</Modal>}
    </nav>
  );
}
