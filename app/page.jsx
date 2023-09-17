"use client";

import "../styles/globals.css";
import Image from "next/image";
import Nav from "@/components/nav";
import { useEffect, useState } from "react";
import NavLogo from "@/components/nav-logo";
import DocsCard from "@/components/docs-card";
import NavSearch from "@/components/nav-search";
import { BLANK_DOC, RESUME_DOC } from "@/enums";
import { getAllDocs } from "@/utils/api/docs/get-all";

export default function Home() {
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    const getAllDocuments = async () => {
      const response = await getAllDocs();
      if (response && response.data) setDocuments(response.data?.documentsList);
    };
    getAllDocuments();
  }, []);

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
            <DocsCard doc={BLANK_DOC}>
              <Image
                width={144}
                height={192}
                alt="Picture of the author"
                src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              />
            </DocsCard>
            <DocsCard doc={RESUME_DOC}>
              <h1 className="font-bold">RESUME</h1>
            </DocsCard>
          </div>
        </div>
      </section>
      <section className="document-grid bg-white w-full py-4">
        <div className="grid-content-wrapper mx-auto">
          <span className="text-gray-900 ml-2">Your documents</span>
          <div className="mt-4 flex items-center gap-4">
            {documents &&
              documents.length > 0 &&
              documents.map((doc) => {
                return (
                  <DocsCard doc={doc} key={doc._id}>
                    <Image
                      width={144}
                      height={192}
                      alt="Picture of the author"
                      src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
                    />
                  </DocsCard>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
