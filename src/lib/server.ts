import { NextResponse } from "next/server";

export function APIResponse(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export function APIResponseWithData(
  message: string,
  status: number,
  data: any
) {
  return NextResponse.json({ message, data }, { status });
}

export const cookieNames = {
  resetEmailRequest: "_rev_email_request",
};
