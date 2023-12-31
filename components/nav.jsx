"use client";

import "../styles/globals.css";
import Modal from "./modal/modal";
import Lock from "@/elements/lock";
import { RESTRICTED } from "@/enums";
import { useState, useEffect } from "react";
import GeneralIcon from "@/elements/general";
import useModal from "@/elements/hooks/useModal";
import NotifyContainer from "./notify-container";
import NotificationIcon from "@/elements/notification";
import ProfileContainer from "./auth/profile-container";
import ShareDocument from "./modal/share-doc/share-doc";
import getProfileLetter from "@/utils/auth/get-profile-letter";

export default function Nav({
  share,
  children,
  document,
  setDocument,
  snackbarUtils,
}) {
  const modalUtils = useModal();
  const { isOpen, component, toggleModal } = modalUtils;

  const [showProfile, setShowProfile] = useState(false);
  const [profileLetter, setProfileLetter] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const shareProps = {
    ...document,
    setDocument,
    profileLetter,
    ...modalUtils,
    ...snackbarUtils,
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
        {share && document?.accessType ? (
          <button
            onClick={() => handleShareClick()}
            className="flex items-center bg-blue-2 rounded-3xl pl-2.5 pr-6 py-1 hover:shadow-search"
          >
            {document?.accessType === RESTRICTED ? (
              <Lock transform="translate(10 6)" />
            ) : (
              <GeneralIcon transform="translate(8 4)" />
            )}

            <span className="ml-1.5 font-semibold text-sm">Share</span>
          </button>
        ) : (
          <></>
        )}

        {!share ? (
          <div className="relative ml-3">
            <button
              onClick={() => {
                setShowProfile(false);
                setShowNotifications((s) => !s);
              }}
              className="hover:bg-grey-7 rounded-full transition-all p-1"
            >
              <NotificationIcon />
            </button>
            {showNotifications ? <NotifyContainer /> : <></>}
          </div>
        ) : (
          <></>
        )}

        <div className="nav-profile relative">
          <button
            onClick={() => {
              setShowNotifications(false);
              setShowProfile((s) => !s);
            }}
            className="h-9 w-9 bg-red-800 rounded-full mx-3 flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm">
              {profileLetter}
            </span>
          </button>
          {showProfile ? (
            <ProfileContainer
              profileLetter={profileLetter}
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
