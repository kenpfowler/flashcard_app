import prisma from "@/lib/prisma";
import SubmissionTable from "./SubmissionTable";

const SubmissionPage = async () => {
  const submissions = await prisma.submission.findMany();

  return (
    <div>
      <h1 className="text-center">Welcome to the SubmissionPage</h1>
      <SubmissionTable submissions={submissions} />
    </div>
  );
};

export default SubmissionPage;
