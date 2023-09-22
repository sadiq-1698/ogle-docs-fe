"use client";

import Nav from "@/components/nav";
import debounce from "lodash.debounce";
import { QuillWrapper } from "./layout";
import NavLogo from "@/components/nav-logo";
import formats from "@/utils/rich-text-editor/format";
import modules from "@/utils/rich-text-editor/modules";
import { useSocket } from "@/providers/socket-provider";
import { getDocById } from "@/utils/api/docs/get-by-id";
import DocStatusBtns from "@/components/doc-status-btns";
import { useCallback, useEffect, useState } from "react";
import getDocumentName from "@/utils/rich-text-editor/get-document-name";

export default function DocFilePage({ params }) {
  const {
    socket,
    isSaving,
    setIsSaving,
    isConnected,
    documentValue,
    setDocumentValue,
  } = useSocket();

  const [starred, setStarred] = useState(false);
  const [document, setDocument] = useState(null);
  const [saveValue, setSaveValue] = useState(documentValue);
  const [docName, setDocName] = useState("");

  // Utility functions
  const handleDocNameChange = (e) => {
    e.preventDefault();
    setDocName(e.target.value);
  };

  const handleDocNameSave = (e) => {
    e.preventDefault();
    if (!e.target.value || e.target.value.toString().length < 1) {
      setDocName(getDocumentName(params, document));
      return;
    }
    setIsSaving(true);
    socket?.emit("save-changes", {
      docId: params.id.toString(),
      changes: {
        name: e.target.value,
      },
    });
  };

  // react hook definitions
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dbnce = useCallback(
    debounce((value) => {
      setSaveValue(value);
    }, 1000),
    []
  );

  // saves doc changes after a second of inactivity
  useEffect(() => {
    setIsSaving(true);
    socket?.emit("save-changes", {
      docId: params.id.toString(),
      changes: {
        content: saveValue,
      },
    });
  }, [saveValue]);

  // stars doc
  useEffect(() => {
    setIsSaving(true);
    socket?.emit("save-changes", {
      docId: params.id.toString(),
      changes: {
        isStarred: starred,
      },
    });
  }, [starred]);

  // fetch document details based on params ID
  useEffect(() => {
    const fetchDocById = async (docId) => {
      setIsSaving(true);
      const response = await getDocById(docId);
      if (response.data) {
        setIsSaving(false);
        setDocument(response.data.document);
        setDocName(response.data.document.name);
        setStarred(response.data.document.isStarred);
        setDocumentValue(response.data.document.content);
      }
    };
    fetchDocById(params.id.toString());
  }, []);

  // setting document value changes from another user in real time
  useEffect(() => {
    socket?.on("output-change", (content) => {
      console.log("Jinglis came here");
      setDocumentValue(content);
    });
  }, [socket]);

  // joining doc room on socket connection
  useEffect(() => {
    if (isConnected) socket?.emit("join-doc", params.id.toString());
  }, [isConnected]);

  return (
    <>
      <Nav share>
        <NavLogo>
          <input
            value={docName}
            onBlur={handleDocNameSave}
            onChange={handleDocNameChange}
            className="text-xl text-gray-600 ml-2 w-40 whitespace-nowrap overflow-hidden text-ellipsis outline-none"
          />
          <DocStatusBtns
            className="ml-4"
            starred={starred}
            setStarred={setStarred}
          />
          <span className="ml-2 text-xs">{isSaving ? "Saving..." : ""}</span>
        </NavLogo>
      </Nav>
      <div className="nav-holder h-14 w-full"></div>
      <section className="doc-editor">
        <QuillWrapper
          theme="snow"
          modules={modules}
          formats={formats}
          value={documentValue}
          onChange={(value, delta) => {
            socket?.emit("input-change", value.toString());
            setDocumentValue(value);
            dbnce(value);
          }}
        />
      </section>
    </>
  );
}
