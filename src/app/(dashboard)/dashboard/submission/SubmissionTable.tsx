"use client";

import { Submission } from "@/types/entities";
import Link from "next/link";

type SubmissionTableProps = {
  submissions: Submission[];
};
const SubmissionTable = ({ submissions }: SubmissionTableProps) => {
  return (
    <>
      <h1 className="text-center">Welcome to the SubmissionTable</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="text-left">Id</th>
            <th className="text-left">Deck Id</th>
            <th className="text-left">User Id</th>
            <th className="text-left">Created</th>
            <th className="text-left">Updated</th>
            <th className="text-left"></th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.id}</td>
              <td>{submission.deckId}</td>
              <td>{submission.userId}</td>
              <td>{new Date(submission.createdAt).toDateString()}</td>
              <td>{new Date(submission.updatedAt).toDateString()}</td>
              <td>
                <Link href={`/session/result?submission=${submission.id}`}>
                  View
                </Link>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SubmissionTable;
