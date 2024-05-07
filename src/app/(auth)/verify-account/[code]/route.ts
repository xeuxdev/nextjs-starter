import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { render } from "@react-email/render";
import { ReviewsHubWelcomeEmail } from "@/components/emails/welcome-email";
import { sendMail } from "@xeuxdev/easymailer";
import { siteConfig } from "@/config/site";
import { env } from "@/config/env";
import { APIResponse } from "@/lib/server";
import db from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const token = params.code;
  let email = "";

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      email: string;
    };

    if (decoded) {
      email = decoded.email;
    }
  } catch (error) {
    return APIResponse("Token Expired", 403);
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    redirect("/signup");
  }

  if (user.emailVerified) {
    redirect("/login");
  }

  const emailHtml = render(ReviewsHubWelcomeEmail());
  const emailPlainText = render(ReviewsHubWelcomeEmail(), {
    plainText: true,
  });

  const verifyUser = await db.user.update({
    where: {
      email: email,
    },
    data: {
      is_verified: true,
    },
  });

  if (verifyUser) {
    await sendMail({
      message: {
        from: siteConfig.name,
        cc: email,
        subject: `Welcome to ${siteConfig.name}`,
        html: emailHtml,
        plainText: emailPlainText,
      },
      transport: {
        service: "gmail",
      },
    });

    redirect("/login");
  } else {
    redirect("/signup");
  }
}
