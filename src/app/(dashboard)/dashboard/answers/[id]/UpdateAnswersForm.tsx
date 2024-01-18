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

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Resources, client } from "@/lib/dotnetApi";

const formSchema = z.object({
  id: z.string(),
  answerText: z.string(),
  isCorrect: z.boolean().default(false),
});

type UpdateAnswersFormProps = {
  id: string;
  answerText: string;
  isCorrect: boolean;
};

export function UpdateAnswersForm({
  id,
  answerText,
  isCorrect,
}: UpdateAnswersFormProps) {
  const [isFetching, setIsFetching] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      answerText,
      isCorrect,
    },
  });

  const createAnswers = async (values: z.infer<typeof formSchema>) => {
    const body = {
      answerText: values.answerText,
      id: values.id,
      isCorrect: values.isCorrect,
    };

    try {
      setIsFetching(true);
      const res = await client.updateResource({
        resource: Resources.Answer,
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
      <form onSubmit={form.handleSubmit(createAnswers)} className="space-y-8">
        <FormField
          control={form.control}
          name="answerText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Input placeholder="add your answer" {...field} />
              </FormControl>
              <FormDescription>
                The AI does it&apos;s best to create answers for you, but you
                can add your own as well.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="cardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a card to add this answer to" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cards.map((card) => (
                    <SelectItem key={card.id} value={card.id.toString()}>
                      {card.question}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="isCorrect"
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
        <Button type="submit">
          {isFetching ? "Please Wait..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
