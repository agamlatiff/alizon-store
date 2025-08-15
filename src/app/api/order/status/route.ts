import prisma from "lib/prisma";
import { NextResponse } from "next/server";

export async function POST(Request: Request) {
  const body = await Request.json();
  const code = body.data.refrerence_id;

  try {
    await prisma.order.update({
      where: {
        code: code,
      },
      data: {
        status: body.data.status === "SUCCEEDED" ? "success" : "failed",
      },
    });
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({ status: true });
}
