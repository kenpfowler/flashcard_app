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
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Subject } from "@prisma/client";

const formSchema = z.object({
  id: z.string(),
  subjectId: z.string(),
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  imageUrl: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type UpdateDeckFromProps = {
  id: string;
  title: string;
  subjects: Subject[];
  subjectId: string;
  description: string | null;
  imageUrl: string | null;
};

export function UpdateDecksForm({
  id,
  title,
  description,
  imageUrl,
  subjectId,
  subjects,
}: UpdateDeckFromProps) {
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      title,
      description: description ?? "",
      subjectId,
      imageUrl: imageUrl ?? "",
    },
  });

  const updateDeck = async (values: z.infer<typeof formSchema>) => {
    const body = {
      id: id,
      title: values.title,
      description: values.description,
      subjectId: values.subjectId,
      imageUrl: values.imageUrl,
    };

    try {
      setIsFetching(true);
      const res = await api.url("/api/decks").patch(body);
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
      <form onSubmit={form.handleSubmit(updateDeck)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="add a title" {...field} />
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
          name="subjectId"
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
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.title}
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