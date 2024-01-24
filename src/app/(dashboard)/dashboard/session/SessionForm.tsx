"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Resources, client } from "@/lib/dotnetApi";
import { Deck } from "@/types/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SessionFormProps = {
  deck: Deck;
  correctAnswers: Array<string>;
};

export const SessionForm = ({ deck, correctAnswers }: SessionFormProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  // FIXME: Not sure if it makes sense to include the entire reportSchema in the form.  The only value we need to collect based on the user input is the answerId
  // could we accept an array of answerId's then package them together with the other required fields on record type? That way we can simplify the form.
  // simplifying the form will allow me to avoid fighting with the libraries/intended function of the radio group since it's not meant to store objects as a value

  // We could...
  // lets call each user answer a submission.  They are aggregated as Array<string>
  // we will need to have the correctAnswerId ordered as an array in the same order they appear in decks
  // const correctAnswers: String[] = [...answers]

  const formSchema = z.object({
    responses: z.array(z.string().min(1, "You must select an answer.")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responses: new Array(deck.cards.length).fill(""),
    },
  });

  const submitSession = async (data: z.infer<typeof formSchema>) => {
    const body = {
      userId: "default",
      deckId: deck.id,
      responses: data.responses.map((response, index) => ({
        answerId: response,
        correctAnswerId: correctAnswers[index],
        cardId: deck.cards[index].id,
      })),
    };

    // what exactly do we want to capture...
    // we will want to know what answer the user selected and the associated question
    // we might also want to have a new table called Report to store the results of completed study sessions
    // { cardId: string, answerId: string, correctAnswerId: string, userId: fk}[]
    try {
      setIsFetching(true);
      const res = await client.createResource({
        resource: Resources.Submission,
        body,
      });

      setIsFetching(false);

      if (typeof res !== "string") {
        throw Error("problem!");
      }

      router.push(`/session/result?submission=${res}`);
    } catch (error) {
      setIsFetching(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitSession)} className="space-y-8">
        {deck.cards.map((deck, index) => (
          <div className="flex flex-col" key={deck.id}>
            <span>{deck.name}</span>
            <FormField
              control={form.control}
              name={`responses.${index}`}
              render={({ field }) => {
                return (
                  <FormItem className="space-y-3">
                    <FormLabel>Select an answer</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex flex-col space-y-1"
                      >
                        {deck.answers.map((answer) => (
                          <FormItem
                            key={answer.id}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={answer.id} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {answer.answerText}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        ))}
        <Button type="submit">
          {isFetching ? "Please Wait..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
