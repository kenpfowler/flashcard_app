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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Resources, client } from "@/lib/dotnetApi";
import { Subject } from "@/types/prisma";

const formSchema = z.object({
  id: z.string(),
  subjectId: z.string(),
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  imageUrl: z.string().min(2, {
    message: "Image URL must be at least 2 characters.",
  }),
});

type UpdateDeckFromProps = {
  id: string;
  name: string;
  subjects: Subject[];
  subjectId: string;
  description: string | null;
  imageUrl: string | null;
};

export function UpdateDecksForm({
  id,
  name,
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
      name,
      description: description ?? "",
      subjectId,
      imageUrl: imageUrl ?? "",
    },
  });

  const updateDeck = async (values: z.infer<typeof formSchema>) => {
    const body = {
      id: id,
      name: values.name,
      description: values.description,
      subjectId: values.subjectId,
      imageUrl: values.imageUrl,
    };

    try {
      setIsFetching(true);
      const res = await client.updateResource({
        resource: Resources.Deck,
        body,
      });
      setIsFetching(false);
      router.refresh();
    } catch (error) {
      setIsFetching(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateDeck)} className="space-y-8">
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
                      {subject.name}
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
