import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  const userExits = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (body.password === userExits?.password) {
    return NextResponse.json({ status: 201 });
  }

  return NextResponse.json({ message: "auth failed" }, { status: 400 });
}
