import prisma from "@/lib/prisma";
import CardsTable from "./CardsTable";

const CardsPage = async () => {
  const cards = await prisma.card.findMany();

  return <CardsTable cards={cards} />;
};

export default CardsPage;
