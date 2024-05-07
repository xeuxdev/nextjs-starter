import React from "react";

export function Boxes() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 -z-10 stroke-foreground/30 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
    >
      <defs>
        <pattern
          id=":r3:"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x="-1"
          y="-1"
        >
          <path d="M.5 40V.5H40" fill="none" strokeDasharray="0"></path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#:r3:)"></rect>
    </svg>
  );
}
