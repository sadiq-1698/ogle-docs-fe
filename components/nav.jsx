"use client";

import "../styles/globals.css";
import { useRouter } from "next/navigation";
import { userLogout } from "@/utils/api/auth/logout";

export default function Nav({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await userLogout();
    router.replace("/auth/login");
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md h-14 p-2 flex items-center justify-between z-50">
      {children}
      <div className="nav-profile" onClick={() => handleLogout()}>
        <div className="h-9 w-9 bg-red-800 rounded-full mx-3"></div>
      </div>
    </nav>
  );
}
