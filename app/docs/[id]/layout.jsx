import "../../../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import { SocketProvider } from "@/providers/socket-provider";
import SnackbarProvider from "@/providers/snackbar-provider";

export default function DocFileLayout({ children }) {
  return (
    <>
      <SocketProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </SocketProvider>
    </>
  );
}
