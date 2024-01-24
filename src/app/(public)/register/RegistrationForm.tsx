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
import { client } from "@/lib/dotnetApi";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().superRefine((password, ctx) => {
    if (password.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        type: "string",
        message: "Passwords must be at least 6 characters.",
        inclusive: true,
        minimum: 6,
      });
    }

    // Check for at least one non-alphanumeric character
    if (!/[^\w]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must have at least one non alphanumeric character.",
      });
    }

    // Check for at least one digit
    if (!/\d/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must have at least one digit ('0'-'9').",
      });
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must have at least one lowercase ('a'-'z').",
      });
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must have at least one uppercase ('A'-'Z').",
      });
    }

    // FIXME: add check for this condition.
    // Check for at least one unique character
  }),
});

export function RegistrationForm() {
  const [isFetching, setIsFetching] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const createAccount = async (values: z.infer<typeof formSchema>) => {
    const body = {
      email: values.email,
      password: values.password,
    };

    try {
      setIsFetching(true);
      await client.registerAccount(body);
      toast({
        title: "Success",
        description: "Account Created",
      });
      setIsFetching(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setIsFetching(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createAccount)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isFetching ? "Please Wait..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
