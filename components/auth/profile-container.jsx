import Close from "@/elements/close";
import SignOut from "@/elements/sign-out";
import { useRouter } from "next/navigation";
import { userLogout } from "@/utils/api/auth/logout";

const profileContainerStyles = {
  minHeight: "210px",
};

const ProfileContainer = ({ profileLetter, setShowProfile }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await userLogout();
    localStorage.clear();
    router.replace("/auth/login");
  };

  return (
    <div
      className="absolute top-14 w-96 z-50 right-4 bg-grey-7 shadow-search rounded-2xl p-6 pt-4 flex flex-col items-center"
      style={profileContainerStyles}
    >
      <div className="relative w-full flex justify-center">
        <span className="w-60 overflow-hidden overflow-ellipsis text-center pt-1">
          {localStorage.getItem("username")}
        </span>
        <button
          aria-label="Close menu"
          onClick={() => setShowProfile(false)}
          className="hover:bg-gray-300 absolute right-0 p-1 rounded-full"
        >
          <Close />
        </button>
      </div>
      <div className="h-16 w-16 bg-red-800 rounded-full mt-6 mb-2 flex items-center justify-center">
        <span className="text-white font-bold text-2xl">{profileLetter}</span>
      </div>
      <span className="text-2xl mb-3">
        Hi, {localStorage.getItem("name").toString().split(" ")[0]}
      </span>

      <button
        onClick={() => handleLogout()}
        className="bg-white rounded-3xl w-full flex items-center justify-center py-5 hover:bg-gray-300"
      >
        <SignOut />
        <span className="ml-2 text-sm font-semibold">Sign out</span>
      </button>
    </div>
  );
};

export default ProfileContainer;
