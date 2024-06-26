import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

export default function OAuthSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  function handleOAuthLogin() {
    setIsLoading(true);
    toast({
      title: "Signing in",
      description: "Please wait",
    });
    signIn("google", { redirect: false, callbackUrl: "/setup" })
      .then((res) => {
        toast({
          title: "Signed in",
          description: "Welcome to Reviews Hub",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleOAuthLogin}
        isLoading={isLoading}
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </>
  );
}
