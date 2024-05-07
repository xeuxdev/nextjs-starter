import React from "react";
import { CreateAccount } from "../_components/create-account";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Create Account | ${siteConfig.name}`,
  description: `Create a ${siteConfig.name} Account`,
};

export default function SignUpPage() {
  return <CreateAccount />;
}
