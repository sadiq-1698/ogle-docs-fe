import "../styles/globals.css";
import Star from "@/elements/star";
import SaveDoc from "@/elements/save-doc";

export default function DocStatusBtns({ className }) {
  return (
    <div className={`flex items-center ${className}`}>
      <button>
        <Star />
      </button>
      <button>
        <SaveDoc />
      </button>
    </div>
  );
}
