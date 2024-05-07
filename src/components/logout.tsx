"use client";

import { signOut } from "next-auth/react";
import React from "react";

export default function LogoutButton() {
  return (
    <p
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="text-destructive hover:text-destructive"
    >
      Log out
    </p>
  );
}
