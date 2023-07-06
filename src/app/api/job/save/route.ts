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

  return NextResponse.json({ status: 201 });
}
