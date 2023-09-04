import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ogle Docs",
  description: "A minimal functional google docs clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="nav-holder h-14 w-full"></div>
        {children}
      </body>
    </html>
  );
}
