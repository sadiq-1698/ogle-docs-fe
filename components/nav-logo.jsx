import "../styles/globals.css";
import Image from "next/image";

export default function NavLogo({ children }) {
  return (
    <div className="nav-logo flex items-center">
      <Image
        width={40}
        height={40}
        alt="Picture of the author"
        src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
      />
      {children}
    </div>
  );
}
