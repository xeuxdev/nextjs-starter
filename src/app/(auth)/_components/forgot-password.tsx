import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRequestPasswordReset } from "../_data-access";

export default function ForgotPassword() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger className="text-left text-xs">
          Forgotten Password?
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="text-center">
            <DialogTitle>Forgotten your password?</DialogTitle>
            <DialogDescription>
              Enter your email to reset your password{" "}
            </DialogDescription>
          </DialogHeader>
          <ForgotPasswordForm />
          <DialogClose>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger className="text-left text-xs">
        Forgotten Password?
      </DrawerTrigger>
      <DrawerContent className="px-5">
        <DrawerHeader className="*:text-center">
          <DrawerTitle>Forgotten your password?</DrawerTitle>
          <DrawerDescription>
            Enter your email to reset your password.
          </DrawerDescription>
        </DrawerHeader>
        <ForgotPasswordForm />
        <DrawerFooter className="pt-4 px-0">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
});

function ForgotPasswordForm() {
  const { mutate, isPending } = useRequestPasswordReset();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  function handleForgotPassword(data: z.infer<typeof ForgotPasswordSchema>) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForgotPassword)}
        className="space-y-5 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" isLoading={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
