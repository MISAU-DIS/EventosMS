type DecorativeBackgroundProps = {
  variant?: "default" | "extended";
};

export default function DecorativeBackground({
  variant = "default",
}: DecorativeBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <img
        src="/bg1.png"
        className="absolute top-0 left-0 w-64 opacity-10"
        alt=""
      />
      <img
        src="/bg2.png"
        className="absolute top-0 right-0 w-64 opacity-10"
        alt=""
      />
      <img
        src="/bg3.png"
        className="absolute top-[40%] left-0 w-72 opacity-10"
        alt=""
      />
      <img
        src="/bg4.png"
        className="absolute top-[40%] right-0 w-72 opacity-10"
        alt=""
      />
      <img
        src="/bg5.png"
        className="absolute bottom-0 left-0 w-80 opacity-10"
        alt=""
      />
      <img
        src="/bg6.png"
        className="absolute bottom-0 right-0 w-80 opacity-10"
        alt=""
      />
      {variant === "extended" && (
        <>
          <img
            src="/bg1.png"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 opacity-10"
            alt=""
          />
          <img
            src="/bg2.png"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-72 opacity-10"
            alt=""
          />
        </>
      )}
    </div>
  );
}
