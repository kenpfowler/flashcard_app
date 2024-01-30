import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Resources, client } from "@/lib/dotnetApi";
import { SideNavigation } from "./SideNavigation";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/app/action";
import { Subject } from "@/types/entities";

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

  const tree = await client.getResources<Subject>({
    resource: Resources.Tree,
    options: {
      auth: client.getAuthorizationHeaderValue(
        session.tokenType,
        session.accessToken
      ),
    },
  });

  return (
    <html className="dark" lang="en">
      <body
        className={cn(
          "max-h-screen h-screen bg-background flex font-sans antialiased",
          fontSans.variable
        )}
      >
        <SideNavigation />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
