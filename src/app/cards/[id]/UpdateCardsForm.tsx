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

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
});

type UpdateCardFormProps = {
  id: string;
  name: string;
  imageUrl: string;
};

export function UpdateCardsForm({ id, name, imageUrl }: UpdateCardFormProps) {
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      name,
      imageUrl,
    },
  });

  const updateCard = async (values: z.infer<typeof formSchema>) => {
    const body = {
      id: id,
      name: values.name,
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="edit your name..." {...field} />
              </FormControl>
              <FormDescription>
                The AI does its best, but you can update your Question name if
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
                <Input placeholder="update your image url here..." {...field} />
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
