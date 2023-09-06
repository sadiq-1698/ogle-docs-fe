import Image from "next/image";
import Nav from "@/components/nav";
import "../styles/globals.css";
import NavLogo from "@/components/nav-logo";
import DocsCard from "@/components/docs-card";
import NavSearch from "@/components/nav-search";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav>
        <NavLogo>
          <span className="text-xl text-gray-600 ml-2">Docs</span>
        </NavLogo>
        <NavSearch />
      </Nav>
      <div className="nav-holder h-14 w-full"></div>
      <section className="document-grid bg-grey-6 w-full py-4">
        <div className="grid-content-wrapper mx-auto">
          <span className="text-gray-900 ml-2">Start a new document</span>
          <div className="mt-4 flex items-center gap-4">
            <DocsCard baseText="Blank" paramId="new">
              <Image
                width={144}
                height={192}
                alt="Picture of the author"
                src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              />
            </DocsCard>
            <DocsCard baseText="Resume" paramId="resume">
              <h1 className="font-bold">RESUME</h1>
            </DocsCard>
          </div>
        </div>
      </section>
    </main>
  );
}
