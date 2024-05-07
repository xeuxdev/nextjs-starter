import React from "react";
import { LoginForm } from "../_components/login-form";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Login | ${siteConfig.name}`,
  description: `Login to your ${siteConfig.name} Account`,
};

export default function LoginPage() {
  return <LoginForm />;
}
