import { NextResponse } from "next/server";
import prisma from "@/app/prisma/utils/prismaCleint";
export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  const appliactionExits = await prisma.application.findUnique({
    where: {
      job_slug: body.job_slug,
    },
  });

  if (appliactionExits) {
    return NextResponse.json(
      { message: "Application already In Database, " },
      { status: 409 }
    );
  }

  const data = await prisma.application.create({
    data: {
      job_slug: body.job_slug,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      userId: Number(body.userId),
      coverLetter: body.coverLetter,
      country: body.country,
    },
  });

  return NextResponse.json(data, { status: 201 });
}
