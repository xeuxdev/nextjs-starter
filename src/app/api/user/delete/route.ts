import DeleteAccountEmail from "@/components/emails/delete-account";
import { siteConfig } from "@/config/site";
import { getUserAuth } from "@/lib/auth";
import db from "@/lib/prisma";
import { APIResponse } from "@/lib/server";
import { render } from "@react-email/render";
import { sendMail } from "@xeuxdev/easymailer";
import { s } from "@xeuxdev/status";

export async function DELETE(request: Request) {
  const { session } = await getUserAuth();

  if (!session) {
    return APIResponse("Unauthorized", 401);
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      profile: {
        select: {
          first_name: true,
        },
      },
    },
  });

  if (!user) {
    return APIResponse("User not found", s.statusNotFound);
  }

  const addUserToDeleteQueue = await db.accountsToBeDeleted.create({
    data: {
      userId: user.id,
    },
  });

  const emailHtml = await render(
    DeleteAccountEmail({
      firstName: `${user?.name?.split(" ")[0] || user.profile?.first_name}`,
    })
  );

  if (addUserToDeleteQueue) {
    await sendMail({
      message: {
        from: `${siteConfig.name}`,
        to: `${user.email}`,
        subject: `Delete Account Request`,
        html: emailHtml,
      },
      transport: {
        service: "gmail",
      },
    });
    return APIResponse("User added to delete queue", s.statusOk);
  } else {
    return APIResponse(
      "Failed to add user to delete queue",
      s.statusInternalServerError
    );
  }
}
