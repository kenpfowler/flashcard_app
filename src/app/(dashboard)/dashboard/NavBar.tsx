"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="flex px-10 py-5 items-center w-full">
      <ul className="flex space-x-2">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/dashboard/submission"}>Submission</Link>
        </li>
        <li>
          <Link href={"/dashboard/subjects"}>Subjects</Link>
        </li>
        <li>
          <Link href={"/dashboard/decks"}>Decks</Link>
        </li>
        <li>
          <Link href={"/dashboard/cards"}>Cards</Link>
        </li>
        <li>
          <Link href={"/dashboard/answers"}>Answers</Link>
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
