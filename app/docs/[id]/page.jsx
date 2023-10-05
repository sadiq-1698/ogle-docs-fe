"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/nav";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import NavLogo from "@/components/nav-logo";
import Snackbar from "@mui/material/Snackbar";
import formats from "@/utils/rich-text-editor/format";
import modules from "@/utils/rich-text-editor/modules";
import { useSocket } from "@/providers/socket-provider";
import { getDocById } from "@/utils/api/docs/get-by-id";
import DocStatusBtns from "@/components/doc-status-btns";
import { useSnackbar } from "@/providers/snackbar-provider";
import BgColorTempSolution from "@/components/temp-solution";
import { useCallback, useEffect, useRef, useState } from "react";
import { deleteAllDocuments } from "@/utils/api/docs/delete-all";
import getDocumentName from "@/utils/rich-text-editor/get-document-name";

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return function myQuillComp({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
  }
);

const snackBarStyles = { minWidth: "auto" };

export default function DocFilePage({ params }) {
  const router = useRouter();
  const snackbarUtils = useSnackbar();
  const { socket, isConnected } = useSocket();

  const { snackBarMsg, showSnackBar, closeSnackbar } = snackbarUtils;

  const quillRef = useRef();

  const [docName, setDocName] = useState("");
  const [starred, setStarred] = useState(false);
  const [document, setDocument] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveValue, setSaveValue] = useState(null);

  // Utility constants
  const navProps = {
    share: true,
    setDocument,
    snackbarUtils,
    document: document,
  };

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

  // marks the doc as starred
  useEffect(() => {
    setIsSaving(true);
    socket?.emit("save-changes", {
      docId: params.id.toString(),
      changes: {
        isStarred: starred,
      },
    });
  }, [starred]);

  useEffect(() => {
    if (socket) {
      socket.on("saved-changes", () => {
        setIsSaving(false);
      });
    }
  }, [socket]);

  // fetch document details based on params ID
  useEffect(() => {
    const fetchDocById = async (docId) => {
      setIsSaving(true);
      const response = await getDocById(docId);
      if (response.error) {
        if (response.status === 403) {
          router.replace("/auth");
        }
      }
      if (response.data) {
        setIsSaving(false);
        setDocument(response.data.document);
        setDocName(response.data.document.name);
        setStarred(response.data.document.isStarred);
      }
    };
    fetchDocById(params.id.toString());
  }, []);

  // set initial content if content exists
  useEffect(() => {
    if (quillRef.current && document?.content) {
      let initialContent;
      const content = document.content;
      const editorInstance = quillRef.current.getEditor();
      try {
        // if in quill delta format
        initialContent = JSON.parse(content);
      } catch (error) {
        // if in html format
        initialContent = editorInstance.clipboard.convert(content);
      } finally {
        editorInstance.setContents(initialContent);
      }
    }
  }, [quillRef.current, document?.content]);

  // setting document value changes from another user in real time
  useEffect(() => {
    if (socket) {
      const handler = (delta) => {
        const editorInstance = quillRef.current?.getEditor();
        editorInstance?.updateContents(delta);
      };

      socket?.on("output-change", handler);

      return () => {
        socket?.off("output-change", handler);
      };
    }
  }, [socket]);

  // sending client changes to server
  useEffect(() => {
    if (quillRef.current && socket) {
      const editorInstance = quillRef.current?.getEditor();

      const handler = (delta, _, source) => {
        if (source !== "user") return;
        socket?.emit("input-change", delta);
        dbnce(JSON.stringify(editorInstance.getContents()));
      };

      editorInstance?.on("text-change", handler);

      return () => {
        editorInstance?.off("text-change", handler);
      };
    }
  }, [socket, quillRef.current]);

  // joining doc room on socket connection
  useEffect(() => {
    if (isConnected) socket?.emit("join-doc", params.id.toString());
  }, [isConnected]);

  return (
    <>
      {document && (
        <>
          <Nav {...navProps}>
            {/* <button onClick={async () => await deleteAllDocuments()}>Simply</button> */}
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
              <span className="ml-2 text-xs">
                {isSaving ? "Saving..." : ""}
              </span>
            </NavLogo>
          </Nav>
          <div className="nav-holder h-14 w-full"></div>
          <section className="doc-editor">
            <BgColorTempSolution />
            <QuillWrapper
              theme="snow"
              modules={modules}
              formats={formats}
              forwardedRef={quillRef}
            />
          </section>

          <Snackbar
            key={snackBarMsg}
            open={showSnackBar}
            message={snackBarMsg}
            style={snackBarStyles}
            autoHideDuration={2000}
            onClose={() => closeSnackbar()}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        </>
      )}
    </>
  );
}
