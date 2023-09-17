"use client";

import "../styles/globals.css";
import Star from "@/elements/star";
import SaveDoc from "@/elements/save-doc";
import StarOutlined from "@/elements/star-outline";
import { createDocument } from "@/utils/api/docs/create";
import { useRouter } from "next/navigation";

export default function DocStatusBtns({ className, setStarred, docDetails }) {
  const router = useRouter();

  const handleDocSave = async () => {
    const response = await createDocument(docDetails);
    if (response.data) router.push("/");
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button onClick={() => setStarred((s) => !s)}>
        {docDetails?.isStarred ? <Star /> : <StarOutlined />}
      </button>
      <button onClick={() => handleDocSave()}>
        <SaveDoc />
      </button>
    </div>
  );
}
