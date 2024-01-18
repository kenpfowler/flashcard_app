"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Resources, client } from "@/lib/dotnetApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CreateCardFormProps = {
  deckId: string;
};

const formSchema = z.object({
  deckId: z.string().min(1, {
    message: "You must choose a deck",
  }),
  imageUrl: z.string(),
  name: z.string(),
  answer_1: z.string(),
  isCorrect_1: z.boolean(),
  answer_2: z.string(),
  isCorrect_2: z.boolean(),
  answer_3: z.string(),
  isCorrect_3: z.boolean(),
  answer_4: z.string(),
  isCorrect_4: z.boolean(),
});

export const CreateCardForm = ({ deckId }: CreateCardFormProps) => {
  const [isFetching, setIsFetching] = useState(false);

  // To create a card we need to know what deck it belongs to.
  // (maybe?) We also might want to know what decks are available in case the user changes their mind.
  // We need a form that accepts the card: name, imageUrl,and related answers.
  // Each answer field needs to accept the answerText, isCorrect.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      imageUrl: "",
      deckId: deckId,
      answer_1: "",
      isCorrect_1: false,
      answer_2: "",
      isCorrect_2: false,
      answer_3: "",
      isCorrect_3: false,
      answer_4: "",
      isCorrect_4: false,
    },
  });

  const createCards = async (values: z.infer<typeof formSchema>) => {
    const body = {
      name: values.name,
      imageUrl: values.imageUrl,
      deckId: values.deckId,
      answer_1: values.answer_1,
      isCorrect_1: values.isCorrect_1,
      answer_2: values.answer_2,
      isCorrect_2: values.isCorrect_2,
      answer_3: values.answer_3,
      isCorrect_3: values.isCorrect_3,
      answer_4: values.answer_4,
      isCorrect_4: values.isCorrect_4,
    };

    try {
      setIsFetching(true);
      const res = await client.createResource({
        resource: Resources.Card,
        body,
      });
      setIsFetching(false);
      form.reset();
    } catch (error) {
      setIsFetching(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createCards)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="Propose a question..." {...field} />
              </FormControl>
              <FormDescription>
                This will be the question that your appears on your flashcard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ImageUrl</FormLabel>
              <FormControl>
                <Input placeholder="image url here..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer_1"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Answer 1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First potential answer here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="isCorrect_1"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Correct answer</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Specify if this answer is meant to be the correct one.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer_2"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Answer 2</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First potential answer here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="isCorrect_2"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Correct answer</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Specify if this answer is meant to be the correct one.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer_3"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Answer 3</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First potential answer here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="isCorrect_3"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Correct answer</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Specify if this answer is meant to be the correct one.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer_4"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Answer 1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First potential answer here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="isCorrect_4"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Correct answer</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Specify if this answer is meant to be the correct one.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Create a UI that allows the user to create from 1 to 4 answers and also allows them to mark if the answers are correct or not */}
        <Button type="submit">
          {isFetching ? "Please Wait..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
