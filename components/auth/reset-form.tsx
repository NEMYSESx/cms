//we used export not export default because by using export we can export mutiple things but by using default export we can export only one thing
"use client";

import * as z from "zod";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas/validation";
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
import { FormStatus, FormStatusProps } from "../form-status";
import { reset } from "@/actions/reset";
import { isError } from "lodash";

export const ResetForm = () => {
  const [errorSuccess, setErrorSuccess] = useState<FormStatusProps>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema), //by using resolvers react-hook-forms allows to use third party library like zod to implement validation
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setErrorSuccess({ message: "", isError: false });
    setErrorSuccess({ message: "", isError: true });
    startTransition(async () => {
      reset(values).then((data) => {
        setErrorSuccess({ message: data.error, isError: true });
        setErrorSuccess({ message: data.success, isError: false });
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forget your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      mainHeader="reset Password"
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
              name="email" //just like forms in react
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="shakir@example.com"
                      type="email"
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
          <Button disabled={isPending} type="submit" className="w-full">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
