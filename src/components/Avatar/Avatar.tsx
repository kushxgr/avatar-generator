import { forwardRef } from "react";

import type { AvatarConfig } from "../../types/avatar";

type Props = {
  config: AvatarConfig;
};

function Star({ x, y, size, fill }: { x: number; y: number; size: number; fill: string }) {
  const outer = size;
  const inner = size * 0.42;
  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const radius = i % 2 === 0 ? outer : inner;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    return `${px},${py}`;
  }).join(" ");

  return <polygon points={points} fill={fill} stroke={fill} strokeLinejoin="round" strokeWidth="1.5" />;
}

const Avatar = forwardRef<SVGSVGElement, Props>(({ config }, ref) => {
  const {
  shape,
  eyes,
  mouth,
  hands,
  legs,
  glasses,
  hat,
  limbColor,
  headColor,
  eyeColor,
  mouthColor,
} = config;
  const renderHead = () => {
    switch (shape) {
      case "square":
        return <rect x="72" y="34" width="96" height="96" rx="14" fill={headColor} />;
      case "roundSquare":
        return <rect x="68" y="30" width="104" height="104" rx="24" fill={headColor} />;
      case "bigRoundSquare":
        return <rect x="62" y="24" width="116" height="116" rx="34" fill={headColor} />;
      case "hex":
        return <polygon points="120,28 168,56 168,114 120,142 72,114 72,56" fill={headColor} />;
      case "toast":
        return <rect x="76" y="22" width="88" height="122" rx="28" fill={headColor} />;
      case "circle":
      default:
        return <circle cx="120" cy="86" r="54" fill={headColor} />;
    }
  };

  const eyeLeftX = 101;
  const eyeRightX = 139;
  const eyeY = 74;

  const renderEyes = () => {
    switch (eyes) {
      case "dot":
        return (
          <>
            <circle cx={eyeLeftX} cy={eyeY} r="5.5" fill={eyeColor} />
            <circle cx={eyeRightX} cy={eyeY} r="5.5" fill={eyeColor} />
          </>
        );
      case "star":
      case "roundedStar":
        return (
          <>
            <Star x={eyeLeftX} y={eyeY} size={7} fill={eyeColor} />
            <Star x={eyeRightX} y={eyeY} size={7} fill={eyeColor} />
          </>
        );
      case "cross":
        return (
          <>
            <path d="M96 69 L106 79 M106 69 L96 79" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M134 69 L144 79 M144 69 L134 79" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case "sleepy":
        return (
          <>
            <path d="M95 75 Q101 69 107 75" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M133 75 Q139 69 145 75" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "plus":
        return (
          <>
            <path d="M101 67 V81 M94 74 H108" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M139 67 V81 M132 74 H146" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case "dash":
        return (
          <>
            <path d="M95 74 H107" stroke={eyeColor} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M133 74 H145" stroke={eyeColor} strokeWidth="3.5" strokeLinecap="round" />
          </>
        );
      case "asterisk":
        return (
          <>
            <path d="M101 67 V81 M94 74 H108 M96 69 L106 79 M106 69 L96 79" stroke={eyeColor} strokeWidth="2.6" strokeLinecap="round" />
            <path d="M139 67 V81 M132 74 H146 M134 69 L144 79 M144 69 L134 79" stroke={eyeColor} strokeWidth="2.6" strokeLinecap="round" />
          </>
        );
      case "dollar":
        return (
          <>
            <text x={eyeLeftX} y="81" textAnchor="middle" fontSize="16" fontWeight="700" fill={eyeColor}>
              $
            </text>
            <text x={eyeRightX} y="81" textAnchor="middle" fontSize="16" fontWeight="700" fill={eyeColor}>
              $
            </text>
          </>
        );
      case "arrowUp":
        return (
          <>
            <path d="M101 80 V68 M95 74 L101 68 L107 74" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M139 80 V68 M133 74 L139 68 L145 74" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </>
        );
      case "arrowDown":
        return (
          <>
            <path d="M101 68 V80 M95 74 L101 80 L107 74" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M139 68 V80 M133 74 L139 80 L145 74" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </>
        );
      case "chevron":
        return (
          <>
            <path d="M95 76 L101 70 L107 76" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M133 76 L139 70 L145 76" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </>
        );
      default:
        return null;
    }
  };
  const renderGlasses = () => {
  if (glasses === "none") return null;

  if (glasses === "round") {
    return (
      <>
        <circle cx="101" cy="74" r="12" stroke="#222" strokeWidth="3" fill="none" />
        <circle cx="139" cy="74" r="12" stroke="#222" strokeWidth="3" fill="none" />
        <line x1="113" y1="74" x2="127" y2="74" stroke="#222" strokeWidth="3" />
      </>
    );
  }

  if (glasses === "square") {
    return (
      <>
        <rect x="89" y="62" width="24" height="24" rx="4" stroke="#222" strokeWidth="3" fill="none" />
        <rect x="127" y="62" width="24" height="24" rx="4" stroke="#222" strokeWidth="3" fill="none" />
        <line x1="113" y1="74" x2="127" y2="74" stroke="#222" strokeWidth="3" />
      </>
    );
  }

  if (glasses === "shades") {
    return (
      <>
        <rect x="88" y="64" width="26" height="18" rx="6" fill="#111" />
        <rect x="126" y="64" width="26" height="18" rx="6" fill="#111" />
        <line x1="114" y1="73" x2="126" y2="73" stroke="#111" strokeWidth="3" />
      </>
    );
  }

  return null;
};
const renderHat = () => {
  if (hat === "none") return null;

  if (hat === "cap") {
    return (
      <>
        <rect x="78" y="20" width="84" height="28" rx="14" fill="#333" />
        <rect x="90" y="40" width="60" height="12" rx="6" fill="#222" />
      </>
    );
  }

  if (hat === "beanie") {
    return (
      <>
        <rect x="80" y="18" width="80" height="36" rx="18" fill="#444" />
        <circle cx="120" cy="18" r="8" fill="#666" />
      </>
    );
  }

  return null;
};

  const renderMouth = () => {
    switch (mouth) {
      case "smile":
        return <path d="M99 102 Q120 122 141 102" stroke={mouthColor} strokeWidth="4" fill="none" strokeLinecap="round" />;
      case "flat":
        return <path d="M99 108 H141" stroke={mouthColor} strokeWidth="4" fill="none" strokeLinecap="round" />;
      case "smirk":
        return <path d="M102 108 Q120 96 140 104" stroke={mouthColor} strokeWidth="4" fill="none" strokeLinecap="round" />;
      case "chevronUp":
        return <path d="M100 110 L120 96 L140 110" stroke={mouthColor} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      case "chevronDown":
        return <path d="M100 98 L120 112 L140 98" stroke={mouthColor} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      case "none":
      default:
        return null;
    }
  };

  const renderHands = () => {
    if (hands === "none") return null;

    if (hands === "rounded") {
      return (
        <>
          <path d="M83 150 C66 150 62 140 60 130" stroke={limbColor} strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M157 150 C174 150 178 140 180 130" stroke={limbColor} strokeWidth="10" fill="none" strokeLinecap="round" />
        </>
      );
    }

    return (
      <>
        <path d="M86 148 L64 127" stroke={limbColor} strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M154 148 L176 127" stroke={limbColor} strokeWidth="8" fill="none" strokeLinecap="round" />
      </>
    );
  };

  const renderLegs = () => {
    if (legs === "none") return null;

    if (legs === "rounded") {
      return (
        <>
          <rect x="98" y="154" width="14" height="34" rx="7" fill={limbColor} />
          <rect x="128" y="154" width="14" height="34" rx="7" fill={limbColor} />
        </>
      );
    }

    return (
      <>
        <path d="M104 154 V188" stroke={limbColor} strokeWidth="9" strokeLinecap="round" />
        <path d="M136 154 V188" stroke={limbColor} strokeWidth="9" strokeLinecap="round" />
      </>
    );
  };

  return (
    <svg ref={ref} viewBox="0 0 240 220" className="avatar-svg" role="img" aria-label="Custom avatar">
      <defs>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.22" />
        </filter>
      </defs>

      <ellipse cx="120" cy="196" rx="56" ry="12" fill="rgba(0,0,0,0.28)" />
      <g filter="url(#shadow)">
        {renderHands()}
        {renderLegs()}
        {renderHat()}
        {renderHead()}
        {renderEyes()}
        {renderGlasses()}
        {renderMouth()}
      </g>
    </svg>
  );
});
export default Avatar;