"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OAuthSignIn from "./o-auth";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useCreateAccount } from "../_data-access";
import { passwordRegex } from "@/lib/utils";

const registerSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(7, {
        message: "Password must contain at least 7 characters",
      })
      .regex(passwordRegex, {
        message:
          "Password must contain at least 7 characters, one uppercase, one lowercase, and one number",
      }),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(7, {
        message: "Password must contain at least 7 characters",
      })
      .regex(passwordRegex, {
        message:
          "Password must contain at least 7 characters, one uppercase, one lowercase, and one number",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export function CreateAccount() {
  const { mutate, isPending } = useCreateAccount();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  function handleCreateAccount(data: z.infer<typeof registerSchema>) {
    mutate(data);
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create your Account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateAccount)}
            className="space-y-5 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="email@example.com" />
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
                    <PasswordInput
                      id="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      id="confirm-password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" isLoading={isPending}>
              Create Account
            </Button>
          </form>
        </Form>
        <OAuthSignIn />
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex justify-center gap-6">
        <p>Already have an account? </p>
        <Link href="/login" className="underline">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
