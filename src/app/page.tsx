"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const data = useSession();
  return (
    <main>
      <div>Home Page</div>
      <Link href="/auth/signin">Login</Link>

      <button onClick={async () => await signOut()}>Logout</button>
    </main>
  );
}
