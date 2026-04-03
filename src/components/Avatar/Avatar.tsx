type Props = {
  eyeType: string;
  mouthType: string;
  color: string;
};

export default function Avatar({ eyeType, mouthType, color }: Props) {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">

      {/* Head */}
      <circle cx="100" cy="100" r="60" fill={color} />

      {/* Eyes */}
      {eyeType === "dot" && (
        <>
          <circle cx="75" cy="90" r="6" fill="black" />
          <circle cx="125" cy="90" r="6" fill="black" />
        </>
      )}

      {eyeType === "line" && (
        <>
          <line x1="70" y1="90" x2="80" y2="90" stroke="black" strokeWidth="3" />
          <line x1="120" y1="90" x2="130" y2="90" stroke="black" strokeWidth="3" />
        </>
      )}

      {/* Mouth */}
      {mouthType === "smile" && (
        <path d="M70 120 Q100 140 130 120" stroke="black" strokeWidth="4" fill="none" />
      )}

      {mouthType === "sad" && (
        <path d="M70 140 Q100 120 130 140" stroke="black" strokeWidth="4" fill="none" />
      )}

    </svg>
  );
}