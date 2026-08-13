import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div
      className={`w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

type PageHeroProps = {
  title: string;
  description?: string;
  className?: string;
};

export function PageHero({ title, description, className = "" }: PageHeroProps) {
  return (
    <div
      className={`pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-6 bg-gradient-to-r from-misau-medium to-misau-dark text-white text-center ${className}`}
    >
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight">
        {title}
      </h1>
      {description && (
        <p className="text-base sm:text-lg md:text-xl text-misau-bright max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
