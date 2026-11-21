/**
 * Scripts que se ejecutan en el <head> antes del primer pintado,
 * para evitar parpadeos de tema y de la intro.
 */

export const THEME_KEY = "cb-theme";
export const INTRO_KEY = "cb-intro";

/** Aplica el tema guardado o, si no hay, el del sistema. */
export const THEME_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

/** Oculta la intro si ya se vio en esta sesión. */
export const INTRO_SEEN_SCRIPT = `try{if(sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.dataset.introSeen=""}catch(e){}`;
