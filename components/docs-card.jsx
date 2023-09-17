"use client";

import "../styles/globals.css";
import { useRouter } from "next/navigation";
import { createDocument } from "@/utils/api/docs/create";

export default function DocsCard({ doc, isTemplate, children }) {
  const router = useRouter();
  const { name } = doc;

  const handleDocCreate = async () => {
    if (isTemplate) {
      const response = await createDocument(doc);
      if (response.data) {
        router.push(`docs/${response.data.docId}`);
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => handleDocCreate()}
        className="bg-white flex items-center justify-center border border-solid border-grey-1 w-36 h-48 cursor-pointer hover:border-blue-600"
      >
        {children}
      </button>
      <span className="mt-2 inline-block ml-1 font-semibold text-sm">
        {name}
      </span>
    </div>
  );
}
