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
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  imageUrl: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function CreateSubjectForm() {
  const [isFetching, setIsFetching] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  const createSubject = async (values: z.infer<typeof formSchema>) => {
    const body = {
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl,
    };

    try {
      setIsFetching(true);
      const res = await api.url("/api/subjects").post(body);
      setIsFetching(false);
      form.reset();
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createSubject)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="add a name" {...field} />
              </FormControl>
              <FormDescription>
                Subjects are the domain you want to study
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="add a description" {...field} />
              </FormControl>
              <FormDescription>
                Describe your subject in a sentence or two
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
              <FormLabel>imageUrl</FormLabel>
              <FormControl>
                <Input placeholder="imageUrl" {...field} />
              </FormControl>
              <FormDescription>
                Provide the url of an image that represents your subject
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
