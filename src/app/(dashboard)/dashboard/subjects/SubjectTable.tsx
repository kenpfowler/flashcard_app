"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Subject } from "@/types/entities";
import { Resources, client } from "@/lib/dotnetApi";

type SubjectTableProps = {
  subjects: Subject[];
};

const SubjectTable = ({ subjects }: SubjectTableProps) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const res = await client.deleteResource({
      resource: Resources.Subject,
      body: id,
    });
  };

  if (subjects.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h3>There are no subjects to display</h3>
        <Button asChild>
          <Link href={"/subjects/create"}>Create</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={"/subjects/create"}>Create</Link>
        </Button>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="text-left">Id</th>
            <th className="text-left">name</th>
            <th className="text-left">Description</th>
            <th className="text-left">Created</th>
            <th className="text-left">Updated</th>
            <th className="text-left">Image</th>
            <th className="text-left"></th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.id}</td>
              <td>{subject.name}</td>
              <td>{subject.description}</td>
              <td>{new Date(subject.createdAt).toDateString()}</td>
              <td>{new Date(subject.updatedAt).toDateString()}</td>
              <td>{subject.imageUrl}</td>
              <td>
                <Link href={`/subjects/${subject.id}`}>Update</Link>
              </td>
              <td>
                <Button
                  onClick={async () => {
                    await handleDelete(subject.id);
                    router.refresh();
                  }}
                  variant={"destructive"}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SubjectTable;
