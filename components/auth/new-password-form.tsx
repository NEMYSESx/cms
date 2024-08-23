//we used export not export default because by using export we can export mutiple things but by using default export we can export only one thing
"use client";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas/validation";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";

import { newPassword } from "@/actions/new-password";
import { FormStatus, FormStatusProps } from "../form-status";
export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [errorSuccess, setErrorSuccess] = useState<FormStatusProps>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema), //by using resolvers react-hook-forms allows to use third party library like zod to implement validation
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setErrorSuccess({ message: "", isError: true });
    setErrorSuccess({ message: "", isError: false });
    startTransition(async () => {
      newPassword(values, token).then((data) => {
        setErrorSuccess({ message: data.error, isError: true });
        setErrorSuccess({ message: data.success, isError: false });
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new Password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      mainHeader="New Password"
    >
      <Form {...form}>
        <form
          //this form.submit actually returns a callback when he gets the green flag from zod validation and then it triggers the submit
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control} //controlled components uncontrolled components handles by react(we use useRef to control unconrolled components)
              name="password" //just like forms in react
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormStatus
            message={errorSuccess?.message}
            isError={errorSuccess?.isError}
          />
          <FormStatus
            message={errorSuccess?.message}
            isError={errorSuccess?.isError}
          />
          <Button disabled={isPending} type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
