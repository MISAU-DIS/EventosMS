"use client";

const SCORE_LABELS = [
  "Insatisfatório",
  "Fraco",
  "Razoável",
  "Bom",
  "Muito bom",
  "Excelente",
] as const;

type ScoreScaleProps = {
  value: number | null;
  onChange: (value: number) => void;
  disabled?: boolean;
  showLabels?: boolean;
};

export default function ScoreScale({
  value,
  onChange,
  disabled,
  showLabels = true,
}: ScoreScaleProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {[0, 1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            disabled={disabled}
            onClick={() => onChange(score)}
            title={SCORE_LABELS[score]}
            className={`min-w-[2.75rem] h-11 px-2 rounded-xl font-semibold text-sm transition-all ${
              value === score
                ? "bg-misau-gold text-white shadow-md ring-2 ring-misau-gold/30"
                : "bg-misau-50 text-misau-dark hover:bg-misau-100 border border-misau-100"
            } disabled:opacity-50`}
          >
            {score}
          </button>
        ))}
      </div>
      {showLabels && value !== null && (
        <p className="text-sm text-misau-medium font-medium">
          {value}/5 — {SCORE_LABELS[value]}
        </p>
      )}
      {showLabels && value === null && (
        <p className="text-xs text-gray-500">Seleccione uma nota de 0 (insatisfatório) a 5 (excelente)</p>
      )}
    </div>
  );
}

export { SCORE_LABELS };
