import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useLogin } from "./use-login";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas";
import { Link } from "react-router-dom";

export function LoginForm() {
  const { login, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit({ email, password }: z.infer<typeof loginSchema>) {
    login(
      { email, password },
      {
        onSettled: () => {},
      },
    );
  }

  // TODO: Resuse this components for the registering as well
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login into your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="demo@gmail.com"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="cursor-pointer"
          >
            Reset
          </Button>
          <Button type="submit" form="login-form" className="cursor-pointer">
            Submit
          </Button>
        </Field>
      </CardFooter>
      <div className="flex justify-around">
        <Button type="button" size="sm" variant="link">
          <Link to="/register">Don't have an account?</Link>
        </Button>
        <Button type="button" size="sm" variant="link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </Button>
      </div>
    </Card>
  );
}
