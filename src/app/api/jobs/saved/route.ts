import prisma from "@/app/prisma/utils/prismaCleint";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  console.log(userId);
  const data = await prisma.user.findUnique({
    where: {
      id: Number(1),
    },

    include: {
      savedJobs: true,
    },
  });

  return NextResponse.json(data, { status: 201 });
}
