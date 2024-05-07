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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { passwordRegex } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useResetPassword } from "../_data-access";

const passwordResetSchema = z
  .object({
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

function ResetPasswordForm() {
  const { mutate, isPending } = useResetPassword();

  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
  });

  const handleResetPassword = (data: z.infer<typeof passwordResetSchema>) => {
    mutate(data);
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your new password below to reset password
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleResetPassword)}
            className="space-y-5 w-full"
          >
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
              Reset
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ResetPasswordForm;
