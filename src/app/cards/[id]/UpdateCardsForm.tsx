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

import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  id: z.string(),
  question: z.string().min(1, {
    message: "Your list of question must be at least 1 character long.",
  }),
  imageUrl: z.string().min(2, {
    message: "Image URL must be at least 2 characters.",
  }),
});

type UpdateCardFormProps = {
  id: string;
  question: string;
  imageUrl: string;
};

export function UpdateCardsForm({
  id,
  question,
  imageUrl,
}: UpdateCardFormProps) {
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      question,
      imageUrl,
    },
  });

  const updateCard = async (values: z.infer<typeof formSchema>) => {
    const body = {
      id: id,
      question: values.question,
      imageUrl: values.imageUrl,
    };

    try {
      setIsFetching(true);
      const res = await api.url("/api/cards").patch(body);
      setIsFetching(false);
      router.refresh();
      console.log(res);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateCard)} className="space-y-8">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea placeholder="edit your question..." {...field} />
              </FormControl>
              <FormDescription>
                The AI does its best, but you can update your question title if
                it isn&apos;t quite right.
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
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="update your image url here..."
                  {...field}
                />
              </FormControl>
              <FormDescription>Update your image url</FormDescription>
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
