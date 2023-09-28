import { NextResponse } from "next/server"

export function APIResponse(message: string, status: number) {
  return NextResponse.json(
    {
      message,
    },
    {
      status,
    }
  )
}

export function APIResponseWithData(data: any, status: number) {
  return NextResponse.json(data, {
    status,
  })
}
