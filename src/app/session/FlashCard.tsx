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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Answer, Card as PrismaCard } from "@prisma/client";

type FlashCardProps = {
  item: PrismaCard & { answers: Array<Answer> };
};

export function FlashCard({ item }: FlashCardProps) {
  const answers = item.answers.map((answer) => answer);
  const init: [string, ...string[]] = ["init"];
  const ids = answers.map((answer) => {
    return answer.id.toString();
  });

  for (let index = 0; index < ids.length; index++) {
    init[index] = ids[index];
  }

  const FormSchema = z.object({
    selection: z.enum(init, {
      required_error: "You need to select an answer.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card className="w-[450px]" key={item.id}>
      <CardHeader>
        <CardTitle>{item.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="selection"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select an answer</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {answers.map((answer) => (
                        <FormItem
                          key={answer.id}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={answer.id.toString()} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {answer.answerText}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
