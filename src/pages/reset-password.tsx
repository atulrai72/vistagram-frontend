import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

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
import { resetSchema } from "@/schemas";
import { Link } from "react-router-dom";
import { useReset } from "@/features/authentication/use-reset-password";

export function Reset() {
  const { resetApi, isPending } = useReset();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  function onSubmit({ otp, newPassword }: z.infer<typeof resetSchema>) {
    resetApi(
      { otp, newPassword },
      {
        onSettled: () => {},
      },
    );
  }

  // TODO: Resuse this components for the registering as well
  return (
    <div className="flex 100vh min-h-screen justify-center items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Reset Your password</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="reset-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="otp"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="otp">OTP</FieldLabel>
                    <Input
                      {...field}
                      id="otp"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="newPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                    <Input
                      {...field}
                      id="newPassword"
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
              type="submit"
              form="reset-form"
              className="cursor-pointer"
              disabled={isPending}
            >
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
