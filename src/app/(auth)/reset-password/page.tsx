import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import ResetPasswordForm from "../_components/reset-password-form";

export const metadata: Metadata = {
  title: `Reset password - ${siteConfig.name}`,
  description: `Reset your password using your email address and we'll send you a verification code.`,
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
