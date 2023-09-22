import Head from "next/head";
import dynamic from "next/dynamic";
import "../../../styles/globals.css";
// import { cookies } from "next/headers";
import "react-quill/dist/quill.snow.css";
import { SocketProvider } from "@/providers/socket-provider";

export const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
);

export default function DocFileLayout({ children }) {
  return (
    <>
      <Head>
        <title>"Document | Ogle Docs"</title>
        <meta name="description" content="Your document" />
      </Head>
      <SocketProvider>{children}</SocketProvider>
    </>
  );
}
