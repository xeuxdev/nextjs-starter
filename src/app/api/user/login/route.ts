import ReviewsHubVerifyEmail from "@/components/emails/verify-email";
import { env } from "@/config/env";
import { siteConfig } from "@/config/site";
import db from "@/lib/prisma";
import { APIResponse } from "@/lib/server";
import { validateEmail } from "@/lib/utils";
import { render } from "@react-email/render";
import { sendMail } from "@xeuxdev/easymailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return APIResponse("Please enter values", 400);
  }

  if (!validateEmail(email)) {
    return APIResponse("Invalid credentials", 403);
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return APIResponse("User not Found", 400);
  }

  const isAccountGoogle = await db.account.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (isAccountGoogle && isAccountGoogle.provider === "google") {
    return APIResponse("Please sign in using the Google Button", 400);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!isPasswordValid) {
    return APIResponse("Invalid Credentials", 401);
  }

  const isUserOnDeleteQueue = await db.accountsToBeDelete.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (isUserOnDeleteQueue) {
    await db.accountsToBeDelete.delete({
      where: {
        userId: user.id,
      },
    });
  }

  if (!user.is_verified) {
    const token = jwt.sign(
      {
        email: user.email,
      },
      env.JWT_SECRET,
      {
        expiresIn: 30 * 24 * 60 * 60,
      }
    );

    const emailHtml = render(
      ReviewsHubVerifyEmail({ verificationCode: token })
    );

    await sendMail({
      message: {
        from: siteConfig.name,
        cc: email,
        subject: "Verify Your Account",
        html: emailHtml,
      },
      transport: {
        service: "gmail",
      },
    });

    return APIResponse("Please verify your email", 401);
  }

  return APIResponse("Logging in....", 200);
}
