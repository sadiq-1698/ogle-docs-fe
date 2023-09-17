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

  const [starred, setStarred] = useState(false);
  const [documentValue, setDocumentValue] = useState(
    getEditorMDTemplate(params)
  );

  return (
    <>
      <Nav>
        <NavLogo>
          <span className="text-xl text-gray-600 ml-2 w-40 whitespace-nowrap overflow-hidden text-ellipsis">
            {getDocumentName(params)}
          </span>
          <DocStatusBtns
            className="ml-4"
            setStarred={setStarred}
            docDetails={{
              isStarred: starred,
              content: documentValue,
              name: getDocumentName(params),
            }}
          />
        </NavLogo>
      </Nav>
      <div className="nav-holder h-14 w-full"></div>
      <section className="doc-editor">
        <QuillWrapper
          onChange={(value) => {
            setDocumentValue(value.toString());
            socket?.emit("input-change", value.toString());
          }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={documentValue}
        />
      </section>
    </>
  );
}
