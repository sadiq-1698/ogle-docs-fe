"use client";

import "../styles/globals.css";
import Lock from "@/elements/lock";
import { useRouter } from "next/navigation";
import { userLogout } from "@/utils/api/auth/logout";

export default function Nav({ children, share }) {
  const router = useRouter();

  const handleLogout = async () => {
    await userLogout();
    router.replace("/auth/login");
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md h-14 p-2 flex items-center justify-between z-50">
      {children}
      <div className="flex items-center">
        {share ? (
          <button className="flex items-center bg-blue-2 rounded-3xl pl-2.5 pr-6 py-1 hover:shadow-search">
            <Lock />
            <span className="ml-1.5 font-semibold text-sm">Share</span>
          </button>
        ) : (
          <></>
        )}

        <div
          className="nav-profile cursor-pointer"
          onClick={() => handleLogout()}
        >
          <div className="h-9 w-9 bg-red-800 rounded-full mx-3"></div>
        </div>
      </div>
    </nav>
  );
}
