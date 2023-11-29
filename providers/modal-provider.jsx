"use client"

import { useState, useEffect } from "react"
import StoreModal from "@/components/StoreModal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])
  
  if (!isMounted) {
    return null;
  }

  else {
   return ( 
    <>
      <StoreModal />
    </>
   )
  }
}