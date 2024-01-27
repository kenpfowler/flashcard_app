"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="flex px-10 py-5 items-center w-full">
      <ul className="flex space-x-2">
        <li>
          <Button asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={"/register"}>Register</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={"/login"}>Sign In</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
};
