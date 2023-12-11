"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import api from "@/lib/api";
import { useState } from "react";

import { Deck } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  questions: z.string().min(2, {
    message: "Your list of questions must be at least 2 characters.",
  }),
  deckId: z.string().min(1, {
    message: "You must choose a deck",
  }),
});

type CreateAnswersFormProps = {
  decks: Deck[];
};

export function CreateCardsForm({ decks }: CreateAnswersFormProps) {
  const [isFetching, setIsFetching] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: "",
      deckId: "",
    },
  });

  const createAnswers = async (values: z.infer<typeof formSchema>) => {
    const body = {
      questions: values.questions,
      deckId: values.deckId,
    };

    try {
      setIsFetching(true);
      const res = await api.url("/api/answers").post(body);
      console.log(res);
      setIsFetching(false);
      form.reset();
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createAnswers)} className="space-y-8">
        <FormField
          control={form.control}
          name="questions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Questions</FormLabel>
              <FormControl>
                <Textarea placeholder="add a list of questions." {...field} />
              </FormControl>
              <FormDescription>
                Post a list of questions. The AI will use these to generate your
                flashcards.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isFetching ? "Please Wait..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
