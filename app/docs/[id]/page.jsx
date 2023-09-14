"use client";

import { useState } from "react";
import Nav from "@/components/nav";
import { QuillWrapper } from "./layout";
import NavLogo from "@/components/nav-logo";
import formats from "@/utils/rich-text-editor/format";
import modules from "@/utils/rich-text-editor/modules";
import { useSocket } from "@/providers/socket-provider";
import DocStatusBtns from "@/components/doc-status-btns";
import getDocumentName from "@/utils/rich-text-editor/get-document-name";
import getEditorMDTemplate from "@/utils/rich-text-editor/sample-resume-md";

export default function DocFilePage({ params }) {
  const { socket } = useSocket();

  const [initialValue, setInitialValue] = useState(getEditorMDTemplate(params));

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
      <div className="nav-holder h-14 w-full"></div>
      <section className="doc-editor">
        <QuillWrapper
          onChange={(value) => {
            console.log("socket from client side", socket);
            socket?.emit("input-change", value.toString());
          }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={initialValue}
        />
      </section>
    </>
  );
}
