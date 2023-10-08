import "../styles/globals.css";
import Star from "@/elements/star";
import SaveDoc from "@/elements/save-doc";
import StarOutlined from "@/elements/star-outline";

export default function DocStatusBtns({ starred, className, setStarred }) {
  return (
    <div className={`flex items-center ${className}`}>
      <button onClick={() => setStarred((s) => !s)}>
        {starred ? <Star /> : <StarOutlined />}
      </button>
      <button onClick={() => {}}>
        <SaveDoc />
      </button>
    </div>
  );
}
