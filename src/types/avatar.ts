export type AvatarShape =
  | "circle"
  | "square"
  | "hex"
  | "roundSquare"
  | "bigRoundSquare"
  | "toast";

export type EyeStyle =
  | "dot"
  | "star"
  | "cross"
  | "sleepy"
  | "plus"
  | "roundedStar"
  | "dash"
  | "asterisk"
  | "dollar"
  | "arrowUp"
  | "arrowDown"
  | "chevron";

export type MouthStyle =
  | "smile"
  | "flat"
  | "smirk"
  | "none"
  | "chevronUp"
  | "chevronDown";



export type GlassesStyle =
  | "none"
  | "round"
  | "square"
  | "shades"
  | "aviator"
  | "thick"
  | "mono";

export type HatStyle =
  | "none"
  | "cap"
  | "beanie"
  | "topHat"
  | "bucket"
  | "crown"
  | "headphones";
export type HandStyle = "stick" | "rounded" | "none";
export type LegStyle = "stick" | "rounded" | "none";
export type ColorTarget = "limb" | "head" | "eye" | "mouth";

export type AvatarConfig = {
  shape: AvatarShape;
  eyes: EyeStyle;
  mouth: MouthStyle;
  glasses: GlassesStyle;
  hat: HatStyle;
  hands: HandStyle;
  legs: LegStyle;
  limbColor: string;
  headColor: string;
  eyeColor: string;
  mouthColor: string;
};