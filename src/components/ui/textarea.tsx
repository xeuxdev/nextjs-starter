"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = ({
  className,
  maxLength,
  defaultValue,
  ...props
}) => {
  const [charLength, setCharLength] = React.useState(
    defaultValue?.toString()?.length || 0
  );
  const ref = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    function autoResize() {
      if (ref.current) {
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }
    }

    autoResize();
    window.addEventListener("resize", autoResize);

    return () => {
      window.removeEventListener("resize", autoResize);
    };
  }, [charLength]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const valueLength = event.target.value.length;
    setCharLength(valueLength);
  };

  React.useEffect(() => {
    if (ref.current) {
      const valueLength = ref.current.value.length;
      setCharLength(valueLength);
    }
  }, [defaultValue]);

  return (
    <div className="relative">
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        maxLength={maxLength}
        defaultValue={defaultValue}
        onInput={handleInput}
        ref={ref}
        {...props}
      />
      <span className="absolute right-1 -top-6">
        {charLength} / {maxLength}
      </span>
    </div>
  );
};
Textarea.displayName = "Textarea";

export { Textarea };
