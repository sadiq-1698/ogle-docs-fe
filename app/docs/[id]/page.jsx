"use client";

import Nav from "@/components/nav";
import { RESUME, NEW } from "@/enums";
import { QuillWrapper } from "./layout";
import { useCallback, useEffect, useState } from "react";
import NavLogo from "@/components/nav-logo";
import formats from "@/utils/rich-text-editor/format";
import modules from "@/utils/rich-text-editor/modules";
import { useSocket } from "@/providers/socket-provider";
import { getDocById } from "@/utils/api/docs/get-by-id";
import DocStatusBtns from "@/components/doc-status-btns";
import getDocumentName from "@/utils/rich-text-editor/get-document-name";
import getEditorMDTemplate from "@/utils/rich-text-editor/sample-resume-md";
import debounce from "lodash.debounce";

export default function DocFilePage({ params }) {
  const { socket, isSaving, setIsSaving, documentValue, setDocumentValue } =
    useSocket();

  const [starred, setStarred] = useState(false);
  const [document, setDocument] = useState(null);
  const [saveValue, setSaveValue] = useState(documentValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dbnce = useCallback(
    debounce((value) => {
      console.log("Socket fired!", value);
      setSaveValue(value);
    }, 1000),
    []
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
    } else {
      setDocumentValue(getEditorMDTemplate(params));
    }
  }, []);

  useEffect(() => {
    setIsSaving(true);
    socket?.emit("save-changes", {
      content: saveValue.toString(),
      docId: params.id.toString(),
    });
  }, [saveValue]);

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
          {isSaving ? "Saving..." : ""}
        </NavLogo>
      </Nav>
      <div className="nav-holder h-14 w-full"></div>
      <section className="doc-editor">
        <QuillWrapper
          onChange={(value) => {
            setDocumentValue(value);
            socket?.emit("input-change", {
              content: value.toString(),
              docId: params.id.toString(),
            });
            dbnce(value);
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
