"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ValidationLogin } from "@/components/ui/validationSchema";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EyeButton from "@/components/ui/EyeButton";
import { ToastProvider, notify } from "@/components/ui/Toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLoginUser } from "@/lib/hooks/api"; 

type FormValues = z.infer<typeof ValidationLogin>;

const LoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  const {login, isLoading, error } = useLoginUser(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(ValidationLogin),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const result = await login.mutateAsync(values);
      console.log("Login result:", result);
      notify("success", "Login successful!");
      reset();
      window.location.href = "/dashboard";
    } catch (error: any) {
      notify("error", error?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    window.open(`http://localhost:5000/auth/google`, "_self");
  };

  return (
    <>
      <ToastProvider />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Card className="mx-auto max-w-md bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Login</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={`block w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                  <Link href="/forgot-password" className="ml-auto inline-block text-sm underline text-indigo-600 dark:text-indigo-400">
                    Forgot your password?
                  </Link>
                </div>
                <EyeButton
                  inputId="password"
                  register={register}
                  errors={errors}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-12"
                disabled={loading || isLoading}
              >
                {loading || isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
              <Button onClick={handleGoogleLogin} variant="outline" className="w-full h-12 mt-4">
                <FcGoogle className="mr-2" />
                Login with Google
              </Button>
              <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline text-indigo-600 dark:text-indigo-400">
                  Sign up
                </Link>
              </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
