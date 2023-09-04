"use client";

import "../../../styles/globals.css";
import Nav from "@/components/nav";
import "react-quill/dist/quill.snow.css";
import NavLogo from "@/components/nav-logo";

export default function DocsPage() {
  return (
    <>
      <Nav>
        <NavLogo>
          <span className="text-xl text-gray-600 ml-2">Blank Document</span>
          <DocStatusBtns className="ml-4" />
        </NavLogo>
      </Nav>
    </>
  );
}
