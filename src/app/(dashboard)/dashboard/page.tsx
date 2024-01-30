import { Resources, client } from "@/lib/dotnetApi";
import { ResizableView } from "./ResizableView";
import { PropsWithChildren } from "react";
import { getSession } from "@/app/action";
import { Subject } from "@/types/entities";

export default async function Dashboard() {
  const session = await getSession();

  const result = await client.getResources<Subject[]>({
    resource: Resources.Tree,
    options: {
      auth: client.getAuthorizationHeaderValue(
        session.tokenType,
        session.accessToken
      ),
    },
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
      <div className="flex flex-col items-center w-full">
        <ResizableView result={result}></ResizableView>
      </div>
    </main>
  );
}
