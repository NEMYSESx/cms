"use client";

import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import CardWrapper from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormStatus, FormStatusProps } from "../form-status";

const NewVerificationForm = () => {
  const [errorSuccess, setErrorSuccess] = useState<FormStatusProps>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    console.log(token);
    // if (errorSuccess?.message) return;
    if (!token) {
      setErrorSuccess({ message: "Missing token!", isError: true });
      return;
    }
    newVerification(token)
      .then((data) => {
        setErrorSuccess({ message: data.success, isError: false });
        setErrorSuccess({ message: data.error, isError: true });
      })
      .catch(() => {
        setErrorSuccess({ message: "Something went wrong!", isError: false });
      });
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      mainHeader="Verify"
    >
      <div className="flex items-center w-full justify-center">
        {!errorSuccess?.message && <BeatLoader />}
        <FormStatus
          message={errorSuccess?.message}
          isError={errorSuccess?.isError}
        />
        {/* {!errorSuccess && (<FormStatus message={errorSuccess?.message} isError={errorSuccess?.isError}/>)} */}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
