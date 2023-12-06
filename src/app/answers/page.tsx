import prisma from "@/lib/prisma";
import CardsTable from "./AnswersTable";
import AnswersTable from "./AnswersTable";

const AnswersPage = async () => {
  const answers = await prisma.answer.findMany();

  return <AnswersTable answers={answers} />;
};

export default AnswersPage;
