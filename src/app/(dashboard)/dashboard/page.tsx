import { Resources, client } from "@/lib/dotnetApi";
import { ResizableView } from "./ResizableView";
import { PropsWithChildren } from "react";
import { getSession } from "@/app/action";

export default async function Dashboard({ children }: PropsWithChildren) {
  const session = await getSession();

  const tree = await client.getResources({
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
        <ResizableView tree={tree}>{children}</ResizableView>
      </div>
    </main>
  );
}
