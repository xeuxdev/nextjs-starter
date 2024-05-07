import { APIResponse, cookieNames } from "@/lib/server";
import { render } from "@react-email/render";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { sendMail } from "@xeuxdev/easymailer";
import { siteConfig } from "@/config/site";
import { validatePassword } from "@/lib/utils";
import { env } from "@/config/env";
import db from "@/lib/prisma";
import ResetPasswordConfirmationEmail from "@/components/emails/reset-password-confirmation";

type DecodedType = jwt.JwtPayload | { email: string };

export async function POST(request: Request) {
  const { password, confirmPassword } = await request.json();
  const cookieStore = cookies();

  if (!password || !confirmPassword) {
    return APIResponse("Bad Request", 400);
  }

  if (password !== confirmPassword) {
    return APIResponse("passwords do not match", 400);
  }

  if (!validatePassword(password) || !validatePassword(confirmPassword)) {
    return APIResponse("Invalid credentials", 400);
  }

  const token = cookieStore.get(cookieNames.resetEmailRequest);

  let decodedData: DecodedType = {};

  if (!token || !token?.value) {
    return APIResponse("Token Expired", 406);
  }

  try {
    const decoded = jwt.verify(token.value, env.JWT_SECRET);
    if (decoded) {
      decodedData = decoded as DecodedType;
    }
  } catch (err: any) {
    APIResponse("Token expired", 406);
    redirect("/forgot-password");
  }

  const user = await db.user.findUnique({
    where: {
      email: decodedData.email,
    },
  });

  if (!user) {
    return APIResponse("User not found", 404);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const updatePassword = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  const emailHtml = render(
    ResetPasswordConfirmationEmail({
      userFirstName: user.name?.split(" ")[0],
    })
  );

  const message = {
    from: `${siteConfig.name}`,
    cc: decodedData.email,
    subject: "Password Reset Confirmation",
    html: emailHtml,
  };

  if (updatePassword) {
    await sendMail({
      message,
      transport: {
        service: "gmail",
      },
    });

    cookies().set({
      name: cookieNames.resetEmailRequest,
      value: "",
      expires: new Date(Date.now()),
      path: "/",
    });

    return APIResponse("You can now login", 200);
  } else {
    return APIResponse("password reset failed", 500);
  }
}
