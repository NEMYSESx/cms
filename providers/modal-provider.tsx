"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
};
//By delaying the rendering of certain components until they are mounted on the client-side to prevent hydration error
