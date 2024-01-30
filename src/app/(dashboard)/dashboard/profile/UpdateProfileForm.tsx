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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { client } from "@/lib/dotnetApi";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

type UpdateProfileFormProps = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
};

export function UpdateProfileForm({
  firstName,
  lastName,
  email,
}: UpdateProfileFormProps) {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      form.setValue("firstName", firstName ?? "");
      form.setValue("lastName", lastName ?? "");
      setIsEditing(false);
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
    },
  });

  const updateUser = async (values: z.infer<typeof formSchema>) => {
    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
    };

    setIsFetching(true);
    const result = await client.updateUserInfo(body);

    if (result.ok) {
      toast({
        title: "Success",
        description: "Profile updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    setIsFetching(false);
    setIsEditing(false);
    router.refresh();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(updateUser)} className="space-y-8">
          <FormField
            disabled={!isEditing}
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            disabled={!isEditing}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email"
              disabled
              value={email ?? ""}
            />
          </FormItem>
          <div className="flex justify-between space-x-2">
            <Button className="w-full" type="button" onClick={toggleEdit}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            <Button className="w-full" type="submit">
              {isFetching ? "Please Wait..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
