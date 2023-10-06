import "../../styles/globals.css";

export const metadata = {
  title: "Access Denied",
  description:
    "You have no access to this document. Request access from the owner.",
};

export default function AccessPageLayout({ children }) {
  return (
    <>
      <div className="mt-20 min-h-screen flex justify-center">{children}</div>
    </>
  );
}
