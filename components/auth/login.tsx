"use client";

import { LoginSchema } from "@/schemas/validation";
import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/login";
import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { FormStatus, FormStatusProps } from "../form-status";

const Login = () => {
  const searchParams = useSearchParams();

  const [errorSuccess, setErrorSuccess] = useState<FormStatusProps>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already is in use with different provider"
      : "";

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setErrorSuccess({ message: "" });
    startTransition(async () => {
      login(values).then((data) => {
        console.log("data", data);
        if (data.error) {
          setErrorSuccess({ message: data.error, isError: true });
        } else {
          setErrorSuccess({ message: data.success, isError: false });
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      mainHeader="Login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
              <Link href="/auth/reset">forget Password?</Link>
            </Button>
            <Button className="w-full" type="submit" disabled={isPending}>
              Login
            </Button>
            <FormStatus
              message={errorSuccess?.message || urlError}
              isError={errorSuccess?.isError || true}
            />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default Login;
