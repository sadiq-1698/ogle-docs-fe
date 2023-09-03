import Image from "next/image";
import DocsCard from "@/components/docs-card";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="document-grid bg-grey-6 w-full py-4">
        <div className="grid-content-wrapper mx-auto">
          <span className="text-gray-900 ml-2">Start a new document</span>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
            <DocsCard>
              <Image
                width={144}
                height={192}
                alt="Picture of the author"
                src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              />
            </DocsCard>
          </div>
        </div>
      </section>
    </main>
  );
}
