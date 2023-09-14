"use client";

import Nav from "@/components/nav";
import NavLogo from "@/components/nav-logo";
import { useSocket } from "@/providers/socket-provider";
import DocStatusBtns from "@/components/doc-status-btns";
import getDocumentName from "@/utils/rich-text-editor/get-document-name";

export default function DocFilePage({ params }) {
  const { isConnected } = useSocket();

  return (
    <>
      <Nav>
        <NavLogo>
          <span className="text-xl text-gray-600 ml-2 w-40">
            {getDocumentName(params)}
          </span>
          <DocStatusBtns className="ml-4" />
        </NavLogo>
      </Nav>
    </>
  );
}
