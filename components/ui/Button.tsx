import Link from "next/link";

/* ============================================================
   BUTTON COMPONENT
   
   Variants:
   - primary (gold): Gold bg → hover black
   - secondary (outline): Border → hover gold fill
   - cta (red): Red bg → hover black
   - dark (for dark sections): Gold bg → hover white
   
   Sizes: sm, md, lg
   ============================================================ */

type ButtonVariant = "primary" | "secondary" | "cta" | "dark";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-light text-black hover:bg-black hover:text-white",
  secondary:
    "border-2 border-black text-black hover:bg-gold-light hover:border-gold-light",
  cta:
    "bg-red-brand text-white hover:bg-black",
  dark:
    "bg-gold-light text-black hover:bg-white",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-[11px]",
  md: "px-5 py-2.5 text-xs",
  lg: "px-6 py-3 text-xs",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold uppercase tracking-eyebrow transition-colors";
  const classes = `${baseStyles} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
