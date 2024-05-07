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
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../_data-access";
import ForgotPassword from "./forgot-password";
import OAuthSignIn from "./o-auth";

const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least 7 characters" }),
});

export function LoginForm() {
  const { mutateAsync, isPending } = useLogin();
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  function handleLogin(data: z.infer<typeof LoginSchema>) {
    mutateAsync(data).then((res) => {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/setup",
      });
    });
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to Login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="space-y-5 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="m@example.com" />
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
            <Button type="submit" className="w-full" isLoading={isPending}>
              Login
            </Button>
          </form>
        </Form>
        <OAuthSignIn />
        <ForgotPassword />
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex justify-center gap-6">
        <p>Don&apos;t have an account yet? </p>
        <Link href="/signup" className="underline">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
