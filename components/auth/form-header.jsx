import Link from "next/link";

export default function FormHeader({
  heading,
  paragraph,
  linkName,
  linkUrl = "/",
  linkDisabled,
}) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img
          alt=""
          className="h-14 w-14"
          src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p
        className={`text-center text-sm text-gray-600 mt-5 ${
          linkDisabled ? "select-none" : ""
        }`}
      >
        {paragraph}
        <Link
          href={linkUrl}
          className="font-semibold text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
