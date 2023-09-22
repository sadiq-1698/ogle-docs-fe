"use client";

import { useState } from "react";
import "../../../styles/globals.css";
import Input from "@/components/input";
import { userLogin } from "@/utils/api/auth/login";
import loginInvalid from "@/utils/validators/login";
import FormAction from "@/components/auth/form-action";
import FormHeader from "@/components/auth/form-header";
import { LOGIN_FIELDS, REGISTER_FIELDS } from "@/enums";
import { userRegister } from "@/utils/api/auth/register";
import registerInvalid from "@/utils/validators/register";
import { useRouter, useSearchParams } from "next/navigation";
import getDisplayTexts from "@/utils/auth/get-display-texts";

const loginFields = LOGIN_FIELDS;
const registerFields = REGISTER_FIELDS;

let logFieldsState = {};
loginFields.forEach((field) => (logFieldsState[field.id] = ""));

let regFieldsState = {};
registerFields.forEach((field) => (regFieldsState[field.id] = ""));

export default function AuthLayout({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const authMode = params.mode.toString();
  const nextUrl = searchParams.get("next");
  const isLoginMode = authMode === "login";
  const displayTexts = getDisplayTexts(isLoginMode);
  const fields = isLoginMode ? loginFields : registerFields;
  const currentFieldState = isLoginMode ? logFieldsState : regFieldsState;

  const [errorMsg, setErrorMsg] = useState("");
  const [errorState, setErrorState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldsState, setFieldsState] = useState(currentFieldState);

  const storeUserData = (userData) => {
    localStorage.setItem("name", userData.name);
    localStorage.setItem("userId", userData._id);
    localStorage.setItem("username", userData.username);
  };

  const handleRegister = async () => {
    if (registerInvalid(fieldsState)) {
      setErrorState(true);
      setErrorMsg("Passwords not matching!");
      return;
    }
    const response = await userRegister(fieldsState);
    if (response.data) router.push("/auth/login");
  };

  const handleLogin = async () => {
    if (loginInvalid(fieldsState)) {
      setErrorState(true);
      setErrorMsg("Please fill the fields!");
      return;
    }
    const response = await userLogin(fieldsState);
    if (response.data?._id) {
      storeUserData(response.data);
      router.replace(nextUrl ? nextUrl : "/");
    } else {
      setErrorState(true);
      setErrorMsg(response.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    isLoginMode ? await handleLogin() : await handleRegister();
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFieldsState({ ...fieldsState, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div id="content-block" className="max-w-md w-full h-full space-y-8">
        <FormHeader
          heading={displayTexts.heading}
          linkUrl={displayTexts.linkUrl}
          linkName={displayTexts.linkName}
          paragraph={displayTexts.paragraph}
        />
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            {fields.map((field) => (
              <div className="mb-3" key={field.id}>
                <Input
                  id={field.id}
                  key={field.id}
                  name={field.name}
                  type={field.type}
                  disabled={isSubmitting}
                  labelFor={field.labelFor}
                  handleChange={handleChange}
                  labelText={field.labelText}
                  value={fieldsState[field.id]}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div className="h-3 mb-0.5">
              {errorState && <p className="text-xs text-red-800">{errorMsg}</p>}
            </div>
            <FormAction
              disabled={isSubmitting}
              text={displayTexts.action}
              handleSubmit={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
