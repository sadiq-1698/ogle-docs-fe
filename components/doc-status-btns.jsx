import "../styles/globals.css";
import Star from "@/elements/star";
import SaveDoc from "@/elements/save-doc";
import StarOutlined from "@/elements/star-outline";

export default function DocStatusBtns({ className, starred }) {
  return (
    <div className={`flex items-center ${className}`}>
      <button>{starred ? <Star /> : <StarOutlined />}</button>
      <button>
        <SaveDoc />
      </button>
    </div>
  );
}
