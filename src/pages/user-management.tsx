import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/features/authentication/use-update-password";
import { useUser } from "@/features/authentication/use-user";
import { useUpdateUser } from "@/features/user-management/use-update-user";
import toast from "react-hot-toast";
import { useState } from "react";

export const profileSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  avatar: z.any().optional(),
});

export const passwordSchema = z
  .object({
    oldPassword: z.string({ message: "Old password is required" }),
    newPassword: z.string().min(6, "Password must be at least 8 characters"),
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function UpdateAccountPage() {
  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800">Update your account</h1>
      <ProfileForm />
      <PasswordForm />
    </div>
  );
}

function ProfileForm() {
  const { user } = useUser();
  const { updateUserApi, isPending } = useUpdateUser();
  const [inputKey, setInputKey] = useState(Date.now());

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
    },
  });

  function onSubmit(data: z.infer<typeof profileSchema>) {

    const hasAvatar = data.avatar !== undefined;
    const hasNameChanged = data.name !== user?.name;

    if (!hasAvatar && !hasNameChanged) {
      return toast.error("No changes detected");
    }

    updateUserApi(data, {
      onSuccess: () => {
        form.resetField("avatar");
        setInputKey(Date.now());
      },
      onError: () => {
        form.resetField("avatar");
        setInputKey(Date.now());
      }
    });
  }

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl text-slate-600">
          Update user data
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white border rounded-lg p-6 shadow-sm">
        <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-6">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="grid md:grid-cols-[200px_1fr] items-center gap-4"
                >
                  <FieldLabel
                    htmlFor="email"
                    className="font-medium text-slate-700 mt-0"
                  >
                    Email address
                  </FieldLabel>
                  <div className="w-full max-w-md">
                    <Input
                      {...field}
                      id="email"
                      disabled
                      className="bg-slate-100 text-slate-500 border-slate-200"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="grid md:grid-cols-[200px_1fr] items-center gap-4"
                >
                  <FieldLabel
                    htmlFor="fullName"
                    className="font-medium text-slate-700 mt-0"
                  >
                    Full name
                  </FieldLabel>
                  <div className="w-full max-w-md">
                    <Input
                      {...field}
                      id="fullName"
                      className="border-slate-200"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />

            {/* Avatar Field */}
            <Controller
              name="avatar"
              control={form.control}
              render={({
                field: { value, onChange, ...field },
                fieldState,
              }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="grid md:grid-cols-[200px_1fr] items-center gap-4"
                >
                  <FieldLabel
                    htmlFor="avatar"
                    className="font-medium text-slate-700 mt-0"
                  >
                    Avatar image
                  </FieldLabel>
                  <div className="w-full max-w-md">
                    <Input
                      {...field}
                      type="file"
                      id="avatar"
                      onChange={(e) => {
                        onChange(e.target.files ? e.target.files[0] : null);
                      }}
                      className="file:bg-indigo-600 file:text-white file:border-none file:mr-4 file:px-4 file:py-2 file:rounded-md file:font-medium hover:file:bg-indigo-700 cursor-pointer border-none shadow-none pl-0"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                      key={inputKey}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex justify-end gap-3 mt-8 pt-4">
            <Button
              variant="outline"
              type="button"
              className="text-slate-600 border-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="profile-form"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Update account
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function PasswordForm() {
  const { updatePasswordApi, isPending } = useUpdatePassword();
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof passwordSchema>) {
    updatePasswordApi(data, {
      onSuccess: () => {
        form.reset();
      },
      onError: () => {
        form.reset();
      },
    });
  }

  return (
    <Card className="w-full border-none shadow-none mt-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl text-slate-600">
          Update password
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white border rounded-lg p-6 shadow-sm">
        <form id="password-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-6">
            <Controller
              name="oldPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="grid md:grid-cols-[200px_1fr] items-center gap-4"
                >
                  <FieldLabel
                    htmlFor="oldPassword"
                    className="font-medium text-slate-700 mt-0"
                  >
                    Old password
                  </FieldLabel>
                  <div className="w-full max-w-md">
                    <Input
                      {...field}
                      id="oldPassword"
                      type="password"
                      className="border-slate-200"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />

            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="grid md:grid-cols-[200px_1fr] items-center gap-4"
                >
                  <FieldLabel
                    htmlFor="newPassword"
                    className="font-medium text-slate-700 mt-0"
                  >
                    New password (min 8 chars)
                  </FieldLabel>
                  <div className="w-full max-w-md">
                    <Input
                      {...field}
                      id="newPassword"
                      type="password"
                      className="border-slate-200"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="grid md:grid-cols-[200px_1fr] items-center gap-4"
                >
                  <FieldLabel
                    htmlFor="confirmPassword"
                    className="font-medium text-slate-700 mt-0"
                  >
                    Confirm password
                  </FieldLabel>
                  <div className="w-full max-w-md">
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      className="border-slate-200"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex justify-end gap-3 mt-8 pt-4">
            <Button
              variant="outline"
              type="button"
              className="text-slate-600 border-slate-200"
              disabled={isPending}
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isPending}
            >
              Update password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
