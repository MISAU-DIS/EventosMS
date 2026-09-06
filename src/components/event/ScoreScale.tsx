"use client";

type ScoreScaleProps = {
  value: number | null;
  onChange: (value: number) => void;
  disabled?: boolean;
};

export default function ScoreScale({ value, onChange, disabled }: ScoreScaleProps) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {[0, 1, 2, 3, 4, 5].map((score) => (
        <button
          key={score}
          type="button"
          disabled={disabled}
          onClick={() => onChange(score)}
          className={`min-w-[2.5rem] h-10 px-2 rounded-lg font-semibold text-sm transition-all ${
            value === score
              ? "bg-misau-gold text-white shadow-md"
              : "bg-misau-50 text-misau-dark hover:bg-misau-100 border border-misau-100"
          } disabled:opacity-50`}
        >
          {score}
        </button>
      ))}
    </div>
  );
}
