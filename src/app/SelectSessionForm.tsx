"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Deck, Subject } from "@/types/prisma";

type SelectSessionFormProps = {
  subjectsWithDecks: Array<Subject & { decks: Array<Deck> }>;
};

export function SelectSessionForm({
  subjectsWithDecks,
}: SelectSessionFormProps) {
  const [decks, setDecks] = useState<Array<Deck>>([]);

  const router = useRouter();

  const FormSchema = z.object({
    subject: z.string(),
    deck: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // {subject: '18', deck: '5'}
    router.push(`/session?deck=${data.deck}`);
  }

  const selectedSubjectId = form.watch("subject");
  const selectedDeckId = form.watch("deck");

  useEffect(() => {
    if (selectedSubjectId) {
      const selectableDecks = subjectsWithDecks
        .map((item) => item.decks)
        .flat()
        .filter((deck) => deck.subjectId.toString() === selectedSubjectId);
      setDecks(selectableDecks);
    }
  }, [selectedSubjectId, subjectsWithDecks]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select an subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject to organize your decks under" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjectsWithDecks.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {decks.length > 0 && (
          <FormField
            control={form.control}
            name="deck"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select a Deck</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a deck" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {decks.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button disabled={!selectedDeckId || !selectedSubjectId} type="submit">
          Study
        </Button>
      </form>
    </Form>
  );
}
