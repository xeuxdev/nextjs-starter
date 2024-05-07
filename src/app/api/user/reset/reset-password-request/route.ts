import { APIResponse, cookieNames } from "@/lib/server";
import { render } from "@react-email/render";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { sendMail } from "@xeuxdev/easymailer";
import db from "@/lib/prisma";
import { env } from "@/config/env";
import ResetPasswordEmail from "@/components/emails/reset-password";
import { siteConfig } from "@/config/site";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return APIResponse("Forbidden", 403);
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return APIResponse("User not found", 400);
  }

  const token = jwt.sign({ email }, env.JWT_SECRET, {
    expiresIn: 15 * 60,
  });

  cookies().set({
    name: cookieNames.resetEmailRequest,
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 15 * 60,
  });

  const emailHtml = render(
    ResetPasswordEmail({
      userFirstName: user.name?.split(" ")[0],
    })
  );

  const response = await sendMail({
    message: {
      from: `${siteConfig.name}`,
      cc: user.email as string,
      subject: "Reset Password Request",
      html: emailHtml,
    },
    transport: {
      service: "gmail",
    },
  });

  return APIResponse(
    response.message,
    response.status == "successful" ? 200 : 500
  );
}
