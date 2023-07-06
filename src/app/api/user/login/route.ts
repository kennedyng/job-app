import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import prisma from "@/app/prisma/utils/prismaCleint";
export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();
  const userExits = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
    include: {
      profile: true,
    },
  });

  if (body.password === userExits?.password) {
    const token = jwt.sign(
      {
        id: userExits?.id,
        email: userExits?.email,
      },
      "project"
    );
    return NextResponse.json(
      {
        ...userExits,
        token,
      },
      { status: 201 }
    );
  }

  return NextResponse.json({ message: "auth failed" }, { status: 409 });
}
