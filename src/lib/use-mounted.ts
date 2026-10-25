import { useEffect, useState } from "react";

// False during SSR and the hydration render, true afterwards. Use it to branch on
// browser-only state (reduced motion, pointer type) without a hydration mismatch.
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
