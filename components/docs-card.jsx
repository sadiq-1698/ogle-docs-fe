import Link from "next/link";
import "../styles/globals.css";

export default function DocsCard({ paramId, baseText, children }) {
  return (
    <Link href={`docs/${paramId}`}>
      <div className="bg-white flex items-center justify-center border border-solid border-grey-1 w-36 h-48 cursor-pointer hover:border-blue-600">
        {children}
      </div>
      <span className="mt-2 inline-block ml-1 font-semibold text-sm">
        {baseText ? baseText : "Blank"}
      </span>
    </Link>
  );
}
