import db from "@/lib/prisma";
import { APIResponse } from "@/lib/server";
import { validatePassword } from "@/lib/utils";
import bcrypt from "bcrypt";
import { render } from "@react-email/render";
import VerifyEmail from "@/components/emails/verify-email";
import { sendMail } from "@xeuxdev/easymailer";
import { siteConfig } from "@/config/site";
import jwt from "jsonwebtoken";
import { env } from "@/config/env";

export async function POST(request: Request) {
  const { email, password, confirmPassword } = await request.json();

  if (!email || !password || !confirmPassword) {
    return APIResponse("All fields are required", 400);
  }

  if (!validatePassword(password) || !validatePassword(confirmPassword)) {
    return APIResponse("Invalid Password", 400);
  }

  if (password !== confirmPassword) {
    return APIResponse("Passwords do not match", 400);
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return APIResponse("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  if (!newUser) {
    return APIResponse("Failed to create user", 500);
  }

  const token = jwt.sign(
    {
      email: newUser.email,
    },
    env.JWT_SECRET,
    {
      expiresIn: 30 * 24 * 60 * 60,
    }
  );

  const emailHtml = render(VerifyEmail({ verificationCode: token }));

  await sendMail({
    message: {
      from: `${siteConfig.name}`,
      cc: `${newUser.email}`,
      subject: `Verify your ${siteConfig.name} account`,
      html: emailHtml,
    },
    transport: {
      service: "gmail",
    },
  });

  return APIResponse("User created successfully", 200);
}
