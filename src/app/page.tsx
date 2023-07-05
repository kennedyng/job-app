"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const data = useSession();

  console.log(data.status);
  return (
    <main>
      <div>Home Page</div>
      <Link href="/auth/signin">Login</Link>
    </main>
  );
}
