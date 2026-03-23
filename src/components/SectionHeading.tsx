import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  children?: ReactNode;
}

const SectionHeading = ({ eyebrow, title, description, align = "center", light = false, children }: SectionHeadingProps) => {
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}`}>
      {eyebrow && (
        <span className={`text-xs tracking-[0.3em] uppercase font-semibold ${light ? "text-gold" : "text-gold-dark"} mb-4 block`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-balance ${light ? "text-primary-foreground" : "text-foreground"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default SectionHeading;
