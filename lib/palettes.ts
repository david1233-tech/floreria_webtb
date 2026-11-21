export type PaletteKey = "rosa" | "rojo" | "amarillo" | "blanco" | "lila" | "durazno";

export type Palette = {
  /** Coronas de pétalos, de afuera hacia adentro: color de la punta y de la base. */
  rings: [Ring, Ring, Ring];
  core: [string, string];
  stamen: string;
  /** Fondo de la ilustración, papel del ramo y color de la caja. */
  bg: string;
  paper: string;
  box: string;
};

type Ring = { tip: string; base: string };

export const PALETTES: Record<PaletteKey, Palette> = {
  rosa: {
    rings: [
      { tip: "#F8E4E1", base: "#D98C93" },
      { tip: "#EFB8BC", base: "#B4546A" },
      { tip: "#D98C93", base: "#8E3550" },
    ],
    core: ["#F7E3B0", "#B8873F"],
    stamen: "#FFF3D6",
    bg: "#F8E4E2",
    paper: "#FBF6F0",
    box: "#F3D5D3",
  },
  rojo: {
    rings: [
      { tip: "#F4A3A6", base: "#C7323F" },
      { tip: "#E0606A", base: "#9E1B2C" },
      { tip: "#C7323F", base: "#6E0F1E" },
    ],
    core: ["#F2C9A0", "#7A1222"],
    stamen: "#FBE3C0",
    bg: "#F6DEDC",
    paper: "#EFE4D6",
    box: "#2B1A1E",
  },
  amarillo: {
    rings: [
      { tip: "#FFF0B3", base: "#F5B83D" },
      { tip: "#FFD86B", base: "#E59A1F" },
      { tip: "#F5B83D", base: "#C47812" },
    ],
    core: ["#7A5230", "#3B2412"],
    stamen: "#E9C987",
    bg: "#FBF0D5",
    paper: "#D9B99B",
    box: "#FBF6F0",
  },
  blanco: {
    rings: [
      { tip: "#FFFFFF", base: "#E6DED3" },
      { tip: "#FFFFFF", base: "#D8CCBD" },
      { tip: "#F6F1EA", base: "#C9BBA8" },
    ],
    core: ["#F7E3B0", "#B8873F"],
    stamen: "#FFF3D6",
    bg: "#E9E4DC",
    paper: "#FBF6F0",
    box: "#FBF6F0",
  },
  lila: {
    rings: [
      { tip: "#F1E8FA", base: "#B79CD9" },
      { tip: "#D9C6EF", base: "#8D6BBF" },
      { tip: "#B79CD9", base: "#5E3F8F" },
    ],
    core: ["#F7E3B0", "#B8873F"],
    stamen: "#FFF3D6",
    bg: "#EEE5F4",
    paper: "#FBF6F0",
    box: "#F1E8FA",
  },
  durazno: {
    rings: [
      { tip: "#FFE9DC", base: "#F2A283" },
      { tip: "#FAC3A8", base: "#E07A5F" },
      { tip: "#F2A283", base: "#B8553D" },
    ],
    core: ["#F7E3B0", "#B8873F"],
    stamen: "#FFF3D6",
    bg: "#FBE6DA",
    paper: "#FBF6F0",
    box: "#FBE6DA",
  },
};
