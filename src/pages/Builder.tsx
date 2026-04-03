import { useMemo, useState, useRef } from "react";
import Avatar from "../components/Avatar/Avatar";
import type {
  AvatarConfig,
  AvatarShape,
  ColorTarget,
  EyeStyle,
  HandStyle,
  LegStyle,
  MouthStyle,
} from "../types/avatar";

const SHAPES: { label: string; value: AvatarShape }[] = [
  { label: "Circle", value: "circle" },
  { label: "Square", value: "square" },
  { label: "Hex", value: "hex" },
  { label: "Round Square", value: "roundSquare" },
  { label: "Big Round Square", value: "bigRoundSquare" },
  { label: "Toast", value: "toast" },
];

const EYES: { label: string; value: EyeStyle }[] = [
  { label: "Dot", value: "dot" },
  { label: "Star", value: "star" },
  { label: "× Cross", value: "cross" },
  { label: "Sleepy", value: "sleepy" },
  { label: "+ Plus", value: "plus" },
  { label: "Rounded Star", value: "roundedStar" },
  { label: "Dash", value: "dash" },
  { label: "Asterisk", value: "asterisk" },
  { label: "$ Dollar", value: "dollar" },
  { label: "Arrow Up", value: "arrowUp" },
  { label: "Arrow Down", value: "arrowDown" },
  { label: "Chevron", value: "chevron" },
];

const MOUTHS: { label: string; value: MouthStyle }[] = [
  { label: "Smile", value: "smile" },
  { label: "Flat", value: "flat" },
  { label: "Smirk", value: "smirk" },
  { label: "None", value: "none" },
  { label: "Chevron Up", value: "chevronUp" },
  { label: "Chevron Down", value: "chevronDown" },
];

const GLASSES = [
  { label: "None", value: "none" },
  { label: "Round", value: "round" },
  { label: "Square", value: "square" },
  { label: "Shades", value: "shades" },
  { label: "Aviator", value: "aviator" },
  { label: "Thick Frame", value: "thick" },
  { label: "Mono", value: "mono" },
];

const HATS = [
  { label: "None", value: "none" },
  { label: "Cap", value: "cap" },
  { label: "Beanie", value: "beanie" },
  { label: "Top Hat", value: "topHat" },
  { label: "Bucket", value: "bucket" },
  { label: "Crown", value: "crown" },
  { label: "Headphones", value: "headphones" },
];

const HANDS: { label: string; value: HandStyle }[] = [
  { label: "Stick", value: "stick" },
  { label: "Rounded", value: "rounded" },
  { label: "None", value: "none" },
];

const LEGS: { label: string; value: LegStyle }[] = [
  { label: "Stick", value: "stick" },
  { label: "Rounded", value: "rounded" },
  { label: "None", value: "none" },
];

const PALETTE = [
  "#7c6cff",
  "#ff6b6b",
  "#c8ff57",
  "#14d0cf",
  "#ff7ab6",
  "#ffe8a3",
  "#ff8a1f",
  "#16b5d8",
];

const DEFAULT_CONFIG: AvatarConfig = {
  shape: "circle",
  eyes: "arrowUp",
  mouth: "smile",
  hands: "none",
  legs: "rounded",

  glasses: "none",
  hat: "none",

  limbColor: "#7c6cff",
  headColor: "#ffd8a8",
  eyeColor: "#151515",
  mouthColor: "#151515",
};

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function OptionGroup<T extends string>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <section className="control-section">
      <div className="section-title">{title}</div>
      <div className="option-grid">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`option-pill ${value === option.value ? "active" : ""}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default function Builder() {
  const [config, setConfig] = useState<AvatarConfig>(DEFAULT_CONFIG);
  const [colorTarget, setColorTarget] = useState<ColorTarget>("limb");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const activeTargetLabel = useMemo(() => {
    switch (colorTarget) {
      case "head":
        return "Head color";
      case "eye":
        return "Eye color";
      case "mouth":
        return "Mouth color";
      case "limb":
      default:
        return "Limb color";
    }
  }, [colorTarget]);

  function update<K extends keyof AvatarConfig>(key: K, value: AvatarConfig[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function applyPalette(color: string) {
    setConfig((prev) => {
      if (colorTarget === "head") return { ...prev, headColor: color };
      if (colorTarget === "eye") return { ...prev, eyeColor: color };
      if (colorTarget === "mouth") return { ...prev, mouthColor: color };
      return { ...prev, limbColor: color };
    });
  }

  function randomizeAvatar() {
    setConfig({
      shape: pick(SHAPES).value,
      eyes: pick(EYES).value,
      mouth: pick(MOUTHS).value,
      hands: pick(HANDS).value,
      legs: pick(LEGS).value,
      limbColor: pick(PALETTE),
      headColor: pick(["#ffd8a8", "#ffe0bd", "#f8c89c", "#f7d7c4"]),
      eyeColor: pick(["#151515", "#1b1b1b", "#222222"]),
      mouthColor: pick(["#151515", "#1b1b1b", "#222222"]),
    });
    setColorTarget("limb");
  }

  function resetAvatar() {
    setConfig(DEFAULT_CONFIG);
    setColorTarget("limb");
  }
  function downloadSVG() {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "avatar.svg";
    a.click();

    URL.revokeObjectURL(url);
}

function downloadPNG() {
  if (!svgRef.current) return;

  const svgData = new XMLSerializer().serializeToString(svgRef.current);
  const img = new Image();
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 220;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);

    const pngUrl = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = "avatar.png";
    a.click();

    URL.revokeObjectURL(url);
  };

  img.src = url;
}

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">Avatar Generator</div>
          <h1>Build a custom avatar</h1>
        </div>

        <div className="topbar-actions">
          <button type="button" className="ghost-button" onClick={resetAvatar}>
            Reset
          </button>
          <button type="button" className="primary-button" onClick={randomizeAvatar}>
            Randomize
          </button>
        </div>
      </header>

      <main className="builder-grid">
        <aside className="preview-card">
          <div className="preview-inner">
            <div className="preview-stage">
                <Avatar ref={svgRef} config={config} />

                <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
                    <button type="button" className="ghost-button" onClick={downloadSVG}>
                        Copy SVG
                    </button>

                    <button type="button" className="primary-button" onClick={downloadPNG}>
                        Download PNG
                    </button>
                </div>
            </div>
   
         </div>
        </aside>

        <section className="controls-card">
          <OptionGroup title="Shape" options={SHAPES} value={config.shape} onChange={(value) => update("shape", value)} />
          <OptionGroup title="Eyes" options={EYES} value={config.eyes} onChange={(value) => update("eyes", value)} />
          <OptionGroup title="Mouth" options={MOUTHS} value={config.mouth} onChange={(value) => update("mouth", value)} />
          <OptionGroup title="Hands" options={HANDS} value={config.hands} onChange={(value) => update("hands", value)} />
          <OptionGroup title="Legs" options={LEGS} value={config.legs} onChange={(value) => update("legs", value)} />
          <OptionGroup
                title="Glasses"
                options={GLASSES}
                value={config.glasses}
               onChange={(value) => update("glasses", value as any)} />

           <OptionGroup
                title="Hat"
                options={HATS}
                value={config.hat}
                onChange={(value) => update("hat", value as any)} /> 

          <section className="control-section">
            <div className="section-title">Colors</div>

            <div className="color-target-row">
              {(["limb", "head", "eye", "mouth"] as ColorTarget[]).map((target) => {
                const label =
                  target === "limb"
                    ? "Limb color"
                    : target === "head"
                      ? "Head color"
                      : target === "eye"
                        ? "Eye color"
                        : "Mouth color";

                const dotColor =
                  target === "limb"
                    ? config.limbColor
                    : target === "head"
                      ? config.headColor
                      : target === "eye"
                        ? config.eyeColor
                        : config.mouthColor;

                return (
                  <button
                    key={target}
                    type="button"
                    className={`target-pill ${colorTarget === target ? "active" : ""}`}
                    onClick={() => setColorTarget(target)}
                  >
                    <span className="target-dot" style={{ backgroundColor: dotColor }} />
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="palette-grid">
              {PALETTE.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`swatch ${config.limbColor === color && colorTarget === "limb" ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => applyPalette(color)}
                  aria-label={`Set ${activeTargetLabel} to ${color}`}
                />
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}