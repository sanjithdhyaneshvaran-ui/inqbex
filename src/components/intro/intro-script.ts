export const INTRO_KEY = "inqbex:intro-seen";

// Runs in <head> before first paint: hides the loader for visitors who already saw it
// this session, so they never get a flash of it.
export const introScript = `try{if(sessionStorage.getItem("${INTRO_KEY}")==="1")document.documentElement.dataset.intro="seen"}catch(e){document.documentElement.dataset.intro="seen"}`;
