import db from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getUserInfo(userId: string | undefined) {
  if (!userId) {
    return;
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      id: true,
      image: true,
      profile: true,
    },
  });

  if (user?.profile) {
    redirect(`/${user.profile.user_name}`);
  }

  if (!user) {
    redirect("/login");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    user_name: user.profile?.user_name,
  };
}
