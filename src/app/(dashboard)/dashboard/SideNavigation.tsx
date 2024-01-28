"use client";

import { BarChart, Book, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { LogoutButton } from "@/app/LogoutButton";

export const SideNavigation = () => {
  return (
    <nav className="flex px-10 py-5 h-full">
      <ul className="flex flex-col justify-between ">
        <div className="flex flex-col space-y-2">
          <li>
            <Link href={"/dashboard"}>
              <span className="flex">
                <Book />
                Study
              </span>
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/progress"}>
              <span className="flex">
                <BarChart />
                Progress
              </span>
            </Link>
          </li>
        </div>
        <div className="flex flex-col space-y-2">
          <li>
            <Link href={"/dashboard/profile"}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/settings"}>
              <span className="flex">
                <Settings /> Settings
              </span>
            </Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </div>
      </ul>
    </nav>
  );
};
