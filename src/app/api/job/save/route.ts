import prisma from "@/app/prisma/utils/prismaCleint";
import { NextResponse } from "next/server";

interface JobType {
  slug: string;
  company_name: string;
  description: string;
  location: string;
  remote: boolean;
  userId: number;
  title: string;
}
export async function POST(req: Request) {
  const body: JobType = await req.json();

  const dataExits = await prisma.savedJobs.findUnique({
    where: {
      slug: body.slug,
    },
  });

  if (dataExits) {
    const updatedData = await prisma.savedJobs.update({
      where: {
        slug: body.slug,
      },

      data: {
        slug: body.slug,
        company_name: body.company_name,
        title: body.title,
        description: body.description.trim(),
        location: body.location,
        remote: Boolean(body.remote),
        userId: Number(body.userId),
      },
    });
    return NextResponse.json({ status: 201 });
  }

  const createdData = await prisma.savedJobs.create({
    data: {
      slug: body.slug,
      company_name: body.company_name,
      title: body.title,
      description: body.description.trim(),
      location: body.location,
      remote: Boolean(body.remote),
      userId: Number(body.userId),
    },
  });

  return NextResponse.json({ status: 201 });
}
