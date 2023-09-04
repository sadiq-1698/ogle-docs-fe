"use client";

import Head from "next/head";
import dynamic from "next/dynamic";
import "../../../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import formats from "@/utils/rich-text-editor/format";
import modules from "@/utils/rich-text-editor/modules";

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
);

export default function DocsLayout({ children }) {
  return (
    <>
      <Head>
        <title>"Document | Ogle Docs"</title>
        <meta name="description" content="Your document" />
      </Head>
      <section className="doc-editor">
        <QuillWrapper modules={modules} formats={formats} theme="snow" />
      </section>
      {children}
    </>
  );
}
