import { useEffect, useState } from "react";

export function useOrigin() {
  const [mounted, setMounted] = useState(false);
  let origin;

  if (typeof window != 'undefined') {
    if (window?.location.origin) {
      origin = window.location.origin;
    }
  }
  else {
    origin = '';
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return '';
  }

  return origin;
}