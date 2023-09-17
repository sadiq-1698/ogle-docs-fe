"use client";

import Nav from "@/components/nav";
import { RESUME, NEW } from "@/enums";
import { QuillWrapper } from "./layout";
import { useEffect, useState } from "react";
import NavLogo from "@/components/nav-logo";
import formats from "@/utils/rich-text-editor/format";
import modules from "@/utils/rich-text-editor/modules";
import { useSocket } from "@/providers/socket-provider";
import { getDocById } from "@/utils/api/docs/get-by-id";
import DocStatusBtns from "@/components/doc-status-btns";
import getDocumentName from "@/utils/rich-text-editor/get-document-name";
import getEditorMDTemplate from "@/utils/rich-text-editor/sample-resume-md";

export default function DocFilePage({ params }) {
  const { socket } = useSocket();

  const [starred, setStarred] = useState(false);
  const [document, setDocument] = useState(null);
  const [documentValue, setDocumentValue] = useState(
    getEditorMDTemplate(params)
  );

  useEffect(() => {
    const fetchDocById = async (docId) => {
      const response = await getDocById(docId);
      if (response.data) {
        setDocument(response.data.document);
        setDocumentValue(response.data.document.content);
      }
    };
    const docId = params.id.toString();
    if (docId !== NEW && docId !== RESUME) {
      fetchDocById(docId);
    }
  }, []);

  return (
    <>
      <Nav>
        <NavLogo>
          <span className="text-xl text-gray-600 ml-2 w-40 whitespace-nowrap overflow-hidden text-ellipsis">
            {getDocumentName(params, document)}
          </span>
          <DocStatusBtns
            className="ml-4"
            starred={starred}
            setStarred={setStarred}
            docDetails={{ ...document }}
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
