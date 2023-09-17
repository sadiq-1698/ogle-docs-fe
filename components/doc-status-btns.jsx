import "../styles/globals.css";
import Star from "@/elements/star";
import SaveDoc from "@/elements/save-doc";
import StarOutlined from "@/elements/star-outline";

export default function DocStatusBtns({ className, docDetails }) {
  return (
    <div className={`flex items-center ${className}`}>
      <button onClick={() => {}}>
        {docDetails?.isStarred ? <Star /> : <StarOutlined />}
      </button>
      <button onClick={() => handleDocSave()}>
        <SaveDoc />
      </button>
    </div>
  );
}
