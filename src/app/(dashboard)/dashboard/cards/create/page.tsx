import { CreateCardForm } from "./CreateCardForm";
import { WithSearchParams } from "@/types/types";

const CreateCardsPage = async ({ searchParams }: WithSearchParams) => {
  const { deck } = searchParams;

  return (
    <div className="flex justify-center">
      <CreateCardForm deckId={deck} />
    </div>
  );
};

export default CreateCardsPage;
