import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center my-auto">
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
    </div>
  );
}
