// Renders *marked* words with a soft purple tint, kept light so the line still reads as one.
export const tintClass =
  "bg-[linear-gradient(100deg,#ead9fa_0%,#c9a3f2_55%,#b07fe8_100%)] bg-clip-text text-transparent";

export function Tinted({ text }: { text: string }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") ? (
      <span key={i} className={tintClass}>
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}
