import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function NotFound() {
  return (
    <html className="dark" lang="en">
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <div className="min-h-screen flex flex-col justify-center items-center">
          <p className="text-base font-semibold text-violet-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7">
            Sorry, there&apos;s nothing to see here.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <Link href="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
