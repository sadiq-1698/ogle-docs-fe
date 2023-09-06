import Link from "next/link";
import "../styles/globals.css";
import Image from "next/image";

export default function NavLogo({ children }) {
  return (
    <div className="nav-logo flex items-center">
      <Link href="/">
        <Image
          width={40}
          height={40}
          alt="Picture of the author"
          src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
        />
      </Link>

      {children}
    </div>
  );
}
