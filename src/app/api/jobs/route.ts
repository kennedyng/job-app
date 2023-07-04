import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const res = await fetch(
    `https://www.arbeitnow.com/api/job-board-api?page=${page}&tags=["junior]`
  );
  const data = await res.json();
  return NextResponse.json({ data });
}
