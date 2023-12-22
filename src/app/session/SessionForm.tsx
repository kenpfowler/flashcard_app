"use client";
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
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Answer, Card } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SessionFormProps = {
  items: Array<Card & { answers: Array<Answer> }>;
};

type FormData = {
  report: Array<{
    cardId: string;
    answerId: string;
    correctAnswerId: string;
    userId: string;
  }>;
};

export const SessionForm = ({ items }: SessionFormProps) => {
  const correctAnswers = items.map(
    (item) => item.answers.find((answer) => answer.isCorrect)?.id ?? ""
  );

  const [isFetching, setIsFetching] = useState(false);

  // FIXME: Not sure if it makes sense to include the entire reportSchema in the form.  The only value we need to collect based on the user input is the answerId
  // could we accept an array of answerId's then package them together with the other required fields on record type? That way we can simplify the form.
  // simplifying the form will allow me to avoid fighting with the libraries/intended function of the radio group since it's not meant to store objects as a value

  // We could...
  // lets call each user answer a submission.  They are aggregated as Array<string>
  // we will need to have the correctAnswerId ordered as an array in the same order they appear in items
  // const correctAnswers: String[] = [...answers]

  const formSchema = z.object({
    submissions: z.array(z.string().min(1, "You must select an answer.")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      submissions: items.map((item) => ""),
    },
  });

  const submitSession = async (data: z.infer<typeof formSchema>) => {
    const body = data.submissions.map((submission, index) => ({
      answerId: submission,
      userId: "default",
      correctAnswerId: correctAnswers[index],
      cardId: items[index].id,
    }));

    // what exactly do we want to capture...
    // we will want to know what answer the user selected and the associated question
    // we might also want to have a new table called Report to store the results of completed study sessions
    // { cardId: string, answerId: string, correctAnswerId: string, userId: fk}[]
    try {
      setIsFetching(true);
      const res = await api.url("/api/submissions").post(body);
      console.log(res);
      setIsFetching(false);
      form.reset();
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitSession)} className="space-y-8">
        {items.map((item, index) => (
          <div className="flex flex-col" key={item.id}>
            <span>{item.name}</span>
            <FormField
              control={form.control}
              name={`submissions.${index}`}
              render={({ field }) => {
                return (
                  <FormItem className="space-y-3">
                    <FormLabel>Select an answer</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex flex-col space-y-1"
                      >
                        {item.answers.map((answer) => (
                          <FormItem
                            key={answer.id}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={answer.id} />
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
                );
              }}
            />
          </div>
        ))}
        <Button type="submit">
          {isFetching ? "Please Wait..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
