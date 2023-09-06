import Spinner from "@/elements/spinner";

export default function FormAction({
  handleSubmit,
  type = "Button",
  action = "submit",
  disabled,
  text,
}) {
  const cursorClass = disabled ? "cursor-not-allowed" : "cursor-pointer";
  const verticalPadding = disabled ? "" : "py-2";

  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          disabled={disabled}
          className={`${cursorClass} ${verticalPadding} disabled:bg-opacity-50 group relative w-full flex justify-center px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
          onSubmit={handleSubmit}
        >
          {disabled ? <Spinner size={40} /> : text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
