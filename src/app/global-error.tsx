"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center gap-4 justify-center h-screen">
          <AlertTriangle className="w-20 h-20" />
          <h1>Oops!!!</h1>
          <h2>Something went wrong!</h2>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
