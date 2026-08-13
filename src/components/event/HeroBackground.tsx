type HeroBackgroundProps = {
  children: React.ReactNode;
};

export default function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <section className="relative w-full overflow-hidden border-b border-misau-gold/20">
      <div
        className="absolute inset-0 bg-gradient-to-br from-misau-50 via-white to-misau-100"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #deb23b 0%, transparent 45%), radial-gradient(circle at 80% 10%, #c59b27 0%, transparent 40%), radial-gradient(circle at 50% 100%, #f3c63f 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
