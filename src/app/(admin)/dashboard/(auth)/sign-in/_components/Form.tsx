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
import SignIn, { type TypeCheckingSignIn } from "../lib/actions";

import { useActionState } from "react";

const initialState: TypeCheckingSignIn = {
  email: "",
  password: "",
};

const FormSignin = () => {
  const [state, formAction, pending] = useActionState(SignIn, initialState);
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
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@gmail.com"
                name="email"
              />
              <p className="text-red-500 text-sm">{state.email}</p>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" name="password" />
              <p className="text-red-500 text-sm">{state.password}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" disabled={pending}>
                {pending ? "Loading..." : "Sign in"}
              </Button>
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
