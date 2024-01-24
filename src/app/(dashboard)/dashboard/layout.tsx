import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ResizableView } from "./ResizableView";
import { Resources, client } from "@/lib/dotnetApi";
import { NavBar } from "./NavBar";
import { PropsWithChildren, Suspense } from "react";
import { WithAuth } from "./WithAuth";
import { getSession } from "@/app/(public)/login/action";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  const tree = await client.getResources({ resource: Resources.Tree });

  return (
    <html className="dark" lang="en">
      <body
        className={cn(
          "max-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NavBar />
        <ResizableView tree={tree}>{children}</ResizableView>
        <Toaster />
      </body>
    </html>
  );
}
