"use client";

import { BarChart, Book, Home, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";

export const SideNavigation = () => {
  return (
    <nav className="flex px-5 py-5 h-full">
      <ul className="flex flex-col justify-between items-center">
        <div className="flex flex-col space-y-2">
          <li>
            <Link href={"/"}>
              <span className="flex">
                <Home width={25} height={25} />
              </span>
            </Link>
          </li>
          <li>
            <Link href={"/dashboard"}>
              <span className="flex">
                <Book width={25} height={25} />
              </span>
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/progress"}>
              <span className="flex">
                <BarChart width={25} height={25} />
              </span>
            </Link>
          </li>
        </div>
        <div className="flex flex-col space-y-2">
          <li>
            <Link href={"/dashboard/profile"}>
              <Avatar>
                <AvatarImage
                  width={25}
                  height={25}
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>
                  <User width={25} height={25} />
                </AvatarFallback>
              </Avatar>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};
