"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import SignIn from "../lib/actions";
import type { ActionResult } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const initialState: ActionResult = {
  error: "",
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Loading..." : "Sign in"}
    </Button>
  );
};

const FormSignin = () => {
  const [state, formAction] = useFormState(SignIn, initialState);

  console.log(state);

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.error !== "" && (
            <Alert variant="destructive">
              <Terminal />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {state.error}
              </AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" name="password" />
            </div>
            <div className="flex flex-col gap-3">
              <SubmitButton />
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default FormSignin;
