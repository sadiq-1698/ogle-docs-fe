"use client";

import Image from "next/image";
import Spinner from "@/elements/spinner";
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import OgleLogoIcon from "@/elements/ogle-logo";
import { createRequest } from "@/utils/api/requests/create";
import { useSnackbar } from "@/providers/snackbar-provider";
import { useRouter, useSearchParams } from "next/navigation";

const snackBarStyles = { minWidth: "auto" };

export default function RequestAccessPage() {
  const router = useRouter();
  const snackbarUtils = useSnackbar();
  const searchParams = useSearchParams();

  const { snackBarMsg, showSnackBar, closeSnackbar, displaySnackbar } =
    snackbarUtils;

  const [loading, setLoading] = useState(false);
  const [validUrl, setValidUrl] = useState(false);

  // Utility functions
  const handleRequestAccess = async () => {
    setLoading(true);
    try {
      const response = await createRequest(searchParams.get("doc"));
      if (response.data) {
        displaySnackbar("Access request sent!");
        setTimeout(() => {
          router.replace("/");
        }, 2000);
      }
    } catch (error) {
      displaySnackbar("Failed sending request!");
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

      <Snackbar
        key={snackBarMsg}
        open={showSnackBar}
        message={snackBarMsg}
        style={snackBarStyles}
        autoHideDuration={2000}
        onClose={() => closeSnackbar()}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
}
