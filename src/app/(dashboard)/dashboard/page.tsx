import Link from "next/link";
import { SelectSessionForm } from "./SelectSessionForm";
import { Button } from "@/components/ui/button";
import { Resources, client } from "@/lib/dotnetApi";
import { Subject } from "@/types/entities";
import { getSession } from "@/app/(public)/login/action";

export default async function Dashboard() {
  const session = await getSession();
  const subjects = (await client.getResources({
    resource: Resources.Subject,
    options: {
      params: { decks: "true" },
      auth: client.getAuthorizationHeaderValue(
        session.tokenType,
        session.accessToken
      ),
    },
  })) as Subject[];

  if (subjects.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center space-y-2 justify-center ">
          <h3>You haven&apos;t created and subjects to study.</h3>
          <Button asChild>
            <Link href={"/subjects/create"}>Create</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center w-full">
        <SelectSessionForm subjectsWithDecks={subjects} />
      </div>
    </main>
  );
}
