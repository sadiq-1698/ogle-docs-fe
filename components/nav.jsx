import "../styles/globals.css";
import Image from "next/image";

export default function Nav({ children }) {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md h-14 p-2 flex items-center justify-between z-50">
      {children}
      <div className="nav-profile">
        <div className="h-9 w-9 bg-red-800 rounded-full mx-3"></div>
      </div>
    </nav>
  );
}
