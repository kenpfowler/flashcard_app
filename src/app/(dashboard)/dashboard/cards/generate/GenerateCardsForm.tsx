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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { client } from "@/lib/dotnetApi";
import { Deck } from "@/types/entities";

const formSchema = z.object({
  questions: z.string().min(2, {
    message: "Your list of questions must be at least 2 characters.",
  }),
  deckId: z.string().min(1, {
    message: "You must choose a deck",
  }),
});

type GenerateCardFormProps = {
  decks: Pick<Deck, "id" | "name">[];
};

export function GenerateCardsForm({ decks }: GenerateCardFormProps) {
  const [isFetching, setIsFetching] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: "",
      deckId: "",
    },
  });

  const generateCards = async (values: z.infer<typeof formSchema>) => {
    const body = {
      questions: values.questions,
      deckId: values.deckId,
    };

    try {
      setIsFetching(true);
      const res = await client._client.url("/api/cards/generate").post(body);
      setIsFetching(false);
      form.reset();
    } catch (error) {
      setIsFetching(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(generateCards)} className="space-y-8">
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
        <FormField
          control={form.control}
          name="deckId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject to organize your decks under" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {decks.map((deck) => (
                    <SelectItem key={deck.id} value={deck.id.toString()}>
                      {deck.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can create a new subject in here
                <Link href="/subjects/create">Create</Link>.
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
