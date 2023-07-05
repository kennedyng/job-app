import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, res: NextResponse) {
  const body = await req.json();

  const jobExits = await prisma.savedJobs.findUnique({
    where: {
      slug: body.slug,
    },
  });

  if (jobExits) {
    await prisma.savedJobs.update({
      where: {
        slug: jobExits.slug,
        data: {
          slug: body.slug,
          comapany_name: body.comapany_name,
        },
      },
    });
  } else {
    await prisma.savedJobs.create({
      data: {
        slug: body.slug,
      },
    });
  }
  return NextResponse.json(data, { status: 201 });
}
