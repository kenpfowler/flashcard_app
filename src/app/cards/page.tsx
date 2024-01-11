import prisma from "@/lib/prisma";
import CardsTable from "./CardsTable";
import { Resources, client } from "@/lib/dotnetApi";
import { Card } from "@/types/prisma";

const CardsPage = async () => {
  const cards = (await client.getResources({
    resource: Resources.Card,
  })) as Card[];

  return <CardsTable cards={cards} />;
};

export default CardsPage;
