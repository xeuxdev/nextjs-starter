import { APIResponse, APIResponseWithData } from "@/lib/server";
import db from "@/lib/prisma";

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
    return APIResponse("Not Found", 404);
  }

  const userInfo = {
    id: user.id,
    email: user.email,
  };

  return APIResponseWithData("Success", 200, userInfo);
}
