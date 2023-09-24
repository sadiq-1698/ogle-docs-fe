import Head from "next/head";
import "../../../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import { SocketProvider } from "@/providers/socket-provider";

export default function DocFileLayout({ children }) {
  return (
    <>
      <Head>
        <title>Document | Ogle Docs</title>
        <meta name="description" content="Your document" />
      </Head>
      <SocketProvider>{children}</SocketProvider>
    </>
  );
}
