"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex px-10 py-5 items-center w-full">
      <ul className="flex space-x-2">
        <li>
          <Link href={"/"}>Dashboard</Link>
        </li>
        <li>
          <Link href={"/submission"}>Submission</Link>
        </li>
        <li>
          <Link href={"/subjects"}>Subjects</Link>
        </li>
        <li>
          <Link href={"/decks"}>Decks</Link>
        </li>
        <li>
          <Link href={"/cards"}>Cards</Link>
        </li>
        <li>
          <Link href={"/answers"}>Answers</Link>
        </li>
        {session ? (
          <li>
            <Button asChild>
              <Link href={"/api/auth/signout"}>Sign Out</Link>
            </Button>
          </li>
        ) : (
          <li>
            <Button asChild>
              <Link href={"/api/auth/signin"}>Sign In</Link>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};
