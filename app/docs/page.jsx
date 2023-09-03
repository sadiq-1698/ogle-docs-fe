import Image from "next/image";
import DocsCard from "@/components/docs-card";

export default function DocsPage() {
  return (
    <div>
      <section className="document-grid bg-grey-6 w-full py-4">
        <div className="grid-content-wrapper mx-auto">
          <span className="text-gray-900 ml-2">Start a new document</span>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
            <DocsCard>Hello</DocsCard>
          </div>
        </div>
      </section>
    </div>
  );
}
