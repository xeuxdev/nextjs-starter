"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { SelectInput } from "@/components/ui/select-input";
import { Textarea } from "@/components/ui/textarea";
import { countries } from "@/constants/countries";
import { professions } from "@/constants/professions";
import { SetupProfileUserInfo } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSetupProfile } from "../_data-access";
import { siteConfig } from "@/config/site";
import Required from "@/components/required";

const setupProfileSchema = z.object({
  first_name: z
    .string({ required_error: "First name is required" })
    .min(3, "First name is required"),
  last_name: z
    .string({ required_error: "Last name is required" })
    .min(3, "Last name is required"),
  user_name: z
    .string({ required_error: "Username is required" })
    .min(3, "Username is required")
    .max(10, "Username must be less than 10 characters"),
});


export default function SetupProfileForm({
  userInfo,
}: {
  userInfo: SetupProfileUserInfo;
}) {
  const { mutate, isPending } = useSetupProfile();

  const form = useForm<z.infer<typeof setupProfileSchema>>({
    resolver: zodResolver(setupProfileSchema),
    defaultValues: {
      first_name: userInfo?.name?.split(" ")[0],
      last_name: userInfo?.name?.split(" ")[1],
    },
  });

  function handleSetupProfile(data: z.infer<typeof setupProfileSchema>) {
    mutate({
      ...data,
      id: userInfo.id,
    });
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Setup your Account</CardTitle>
          <CardDescription>
            Fill out the following fields to setup your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSetupProfile)}
              className="space-y-5 w-full"
            >
              <div className="flex items-start gap-5">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        First Name <Required />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Last Name <Required />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="user_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Username <Required />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="john_doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" isLoading={isPending}>
                Setup Profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
