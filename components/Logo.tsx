import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Aarith logo mark — the gradient cross.
 *
 * Inlined as SVG (instead of <img src="/aarith-logo.svg" />) so:
 *   - the gradient color stops can be tuned via CSS / theme later
 *   - it ships zero extra network request
 *   - it scales to any size with no blur
 */
export function Logo({
  className,
  size = 28,
  ariaLabel = "Aarith"
}: {
  className?: string;
  size?: number;
  ariaLabel?: string;
}) {
  // Each instance needs a unique gradient id when multiple Logos are on a page,
  // otherwise the second one re-uses (and recolors) the first.
  const id = React.useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={ariaLabel}
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id={id} x1="6%" y1="8%" x2="94%" y2="92%">
          <stop offset="0%" stopColor="#FF6B3D" />
          <stop offset="32%" stopColor="#FF2D87" />
          <stop offset="62%" stopColor="#A93BD9" />
          <stop offset="100%" stopColor="#3B5BDB" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M42 16 A8 8 0 0 1 58 16 L58 42 L84 42 A8 8 0 0 1 84 58 L58 58 L58 84 A8 8 0 0 1 42 84 L42 58 L16 58 A8 8 0 0 1 16 42 L42 42 Z"
      />
    </svg>
  );
}
