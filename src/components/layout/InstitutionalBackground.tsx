type InstitutionalBackgroundProps = {
  variant?: "default" | "extended";
};

export default function InstitutionalBackground({
  variant = "default",
}: InstitutionalBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-misau-50 via-white to-misau-100" />
      <div
        className="absolute inset-0 opacity-[0.12] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/misau-edificio.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-misau-50/40" />
      {variant === "extended" && (
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-misau-medium/10 to-transparent" />
      )}
    </div>
  );
}
