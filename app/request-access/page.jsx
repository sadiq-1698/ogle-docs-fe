"use client";

import Image from "next/image";
import Spinner from "@/elements/spinner";
import { useEffect, useState } from "react";
import OgleLogoIcon from "@/elements/ogle-logo";
import { useRouter, useSearchParams } from "next/navigation";
import { createRequest } from "@/utils/api/requests/create";

export default function RequestAccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [validUrl, setValidUrl] = useState(false);

  // Utility functions
  const handleRequestAccess = async () => {
    setLoading(true);
    try {
      const response = await createRequest(searchParams.get("doc"));
      if (response.data) {
        console.log("Success!", response);
      }
    } catch (error) {
      console.log("Failure");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const docId = searchParams.get("doc");
    if (!docId) {
      router.replace("/");
    } else {
      setValidUrl(true);
    }
  }, [searchParams, router]);

  return (
    <>
      {validUrl ? (
        <div className="flex">
          <div>
            <div className="flex items-center mb-8">
              <OgleLogoIcon />
              <span className="text-2xl text-grey-11 font-medium ml-3">
                Ogle Docs
              </span>
            </div>

            <h2 className="text-3xl font-medium">You need access</h2>
            <p className="mt-4 text-sm text-grey-11">
              Request access, or switch to an account with access.
            </p>

            <textarea
              placeholder="Message (Optional)"
              className="mt-4 w-full border-2 border-solid border-gray-400 focus:border-blue-700 outline-none rounded-md p-3 px-4"
            />

            <button
              onClick={() => handleRequestAccess()}
              className="mt-4 rounded-3xl bg-blue-700 text-white font-semibold p-2 px-5 text-sm hover:shadow-search smooth-scale"
            >
              {loading ? <Spinner size={20} /> : "Send"}
            </button>
          </div>

          <Image
            width={300}
            height={300}
            alt="request-access"
            src="/request-access.png"
            style={{ maxHeight: "300px" }}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
