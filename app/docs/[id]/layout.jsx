"use client";

import Head from "next/head";
import dynamic from "next/dynamic";
import "../../../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import formats from "@/utils/rich-text-editor/format";
import modules from "@/utils/rich-text-editor/modules";
import getEditorMDTemplate from "@/utils/rich-text-editor/sample-resume-md";

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
);

export default function DocFileLayout({ children, params }) {
  const [initialValue, setInitialValue] = useState(getEditorMDTemplate(params));

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>"Document | Ogle Docs"</title>
        <meta name="description" content="Your document" />
      </Head>
      <section className="doc-editor">
        <QuillWrapper
          theme="snow"
          modules={modules}
          formats={formats}
          value={initialValue}
        />
      </section>
      {children}
    </>
  );
}
