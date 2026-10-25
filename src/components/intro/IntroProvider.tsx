"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { IntroLoader } from "./IntroLoader";
import { INTRO_KEY } from "./intro-script";

const IntroContext = createContext(true);

// True once the opening loader has finished (or was skipped). Hero motion waits on this.
export function useIntroDone() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const [play, setPlay] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      seen = true; // storage blocked: don't risk replaying on every page
    }
    if (seen) {
      setPlay(false);
      setDone(true);
    }
  }, []);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    setDone(true);
  }, []);

  return (
    <IntroContext.Provider value={done}>
      {play && <IntroLoader onReveal={finish} onExited={() => setPlay(false)} />}
      {children}
    </IntroContext.Provider>
  );
}
