import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  const userExits = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userExits) {
    return NextResponse.json(
      { message: "user already exists" },
      { status: 409 }
    );
  } else {
    const data = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        profile: {
          create: {
            firstName: body.firstName,
            lastName: body.lastName,
            middleName: body.middleName,
            country: body.country,
          },
        },
      },
    });
    return NextResponse.json(data, { status: 201 });
  }
}
