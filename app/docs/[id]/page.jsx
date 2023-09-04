"use client";

import Nav from "@/components/nav";
import NavLogo from "@/components/nav-logo";
import DocStatusBtns from "@/components/doc-status-btns";

export default function DocFilePage({ params }) {
  return (
    <>
      <Nav>
        <NavLogo>
          <span className="text-xl text-gray-600 ml-2">
            {params.id.toString()}
          </span>
          <DocStatusBtns className="ml-4" />
        </NavLogo>
      </Nav>
    </>
  );
}
