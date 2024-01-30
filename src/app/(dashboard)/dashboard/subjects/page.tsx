import { Subject } from "@/types/entities";
import SubjectTable from "./SubjectTable";
import { Resources, client } from "@/lib/dotnetApi";
// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export default async function SubjectsPage() {
  const res = await client.getResources<Subject[]>({
    resource: Resources.Subject,
  });

  if (!res.ok) {
    return (
      <div className="flex justify-center">
        <p>{res.message}</p>
      </div>
    );
  }

  return <SubjectTable subjects={res.value} />;
}
