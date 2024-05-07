import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import React from "react";

function VerifyPage() {
  return (
    <Card>
      <CardHeader className="text-2xl">
        <CardTitle>Verify Your Account</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative space-y-10">
          <Send className="w-20 h-20 mx-auto text-center" />
          <p className="text-center">
            We&apos;ve sent you an email on how to verify your account.
          </p>

          <p className="text-center text-muted-foreground">
            Kindly Check your inbox for the email. If you can&apos;t find it
            there, check your spam folder.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default VerifyPage;
