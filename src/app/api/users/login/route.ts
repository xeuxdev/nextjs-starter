import { APIResponse, APIResponseWithData } from "@/lib/api"

export async function POST(request: Request) {
  // get email and password from frontend
  const { email, password } = await request.json()

  //   if there is no email or password
  if (!email || !password) {
    return APIResponse("Invalid email or password", 400)
  }

  //   check if user exists

  //

  return APIResponseWithData(
    {
      email,
      password,
    },
    200
  )
}
