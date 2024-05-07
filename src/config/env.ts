import "dotenv/config.js";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(10),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    NEXTAUTH_SECRET: z.string().optional(),
    NEXTAUTH_URL: z.string().optional(),
    BASE_URL: z.string(),
    GOOGLE_AUTH_ID: z.string(),
    GOOGLE_AUTH_SECRET: z.string(),
    JWT_SECRET: z.string(),
    MAILER_GOOGLE_USER_EMAIL: z.string(),
    MAILER_GOOGLE_USER_PASSWORD: z.string(),
    MAILER_API_KEY: z.string().optional(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    BASE_URL: process.env.BASE_URL,
    GOOGLE_AUTH_ID: process.env.GOOGLE_AUTH_ID,
    GOOGLE_AUTH_SECRET: process.env.GOOGLE_AUTH_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    MAILER_GOOGLE_USER_EMAIL: process.env.MAILER_GOOGLE_USER_EMAIL,
    MAILER_GOOGLE_USER_PASSWORD: process.env.MAILER_GOOGLE_USER_PASSWORD,
    MAILER_API_KEY: process.env.MAILER_API_KEY,
  },
});
