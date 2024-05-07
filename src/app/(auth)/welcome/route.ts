import { ReviewsHubWelcomeEmail } from "@/components/emails/welcome-email";
import { siteConfig } from "@/config/site";
import { getUserAuth } from "@/lib/auth";
import db from "@/lib/prisma";
import { render } from "@react-email/render";
import { sendMail } from "@xeuxdev/easymailer";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { session } = await getUserAuth();

  if (!session) {
    redirect("/login");
  }

  const googleUser = await db.account.findFirst({
    where: {
      provider: "google",
      userId: session.user.id,
    },
  });

  if (!googleUser) {
    redirect("/login");
  }

  const emailHtml = render(ReviewsHubWelcomeEmail());

  await sendMail({
    message: {
      from: `${siteConfig.name}`,
      cc: `${session.user.email}`,
      subject: `Welcome to ${siteConfig.name}`,
      html: emailHtml,
    },
    transport: {
      service: "gmail",
    },
  });

  redirect("/setup");
}
