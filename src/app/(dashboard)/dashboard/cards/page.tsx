import CardsTable from "./CardsTable";
import { Resources, client } from "@/lib/dotnetApi";
import { Card } from "@/types/entities";

const CardsPage = async () => {
  const res = await client.getResources<Card[]>({
    resource: Resources.Card,
  });

  if (!res.ok) {
    return (
      <div className="flex justify-center">
        <p>{res.message}</p>
      </div>
    );
  }

  return <CardsTable cards={res.value} />;
};

export default CardsPage;
