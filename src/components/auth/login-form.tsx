"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn, Mail, Shield } from "lucide-react";
import { toast } from "sonner";
import { loginSchema, type LoginInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema) as unknown as Resolver<LoginInput>,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitCredentials = handleSubmit(async (values) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      toast.error("Unable to sign in", {
        description: "Check your email and password, then try again.",
      });
      return;
    }

    toast.success("Welcome back", {
      description: "Redirecting to dashboard.",
    });
    router.replace("/dashboard");
  });

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const result = await signIn("google", { callbackUrl: "/dashboard" });

    if (result?.error) {
      toast.error("Google sign-in failed", {
        description: "Please check the OAuth configuration.",
      });
      setGoogleLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl steel-gradient text-white shadow-lg shadow-blue-950/20">
          <Shield className="h-5 w-5" />
        </div>
        <CardTitle>Sign in to Omnia Steels CRM</CardTitle>
        <CardDescription>
          Use your email/password or Google account to access the steel trade workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={submitCredentials}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input id="email" type="email" placeholder="you@omnia.com" className="pl-9" {...register("email")} />
            </div>
            {errors.email ? <p className="text-xs text-rose-600">{errors.email.message}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password ? <p className="text-xs text-rose-600">{errors.password.message}</p> : null}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || googleLoading}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            Sign in
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          or
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={googleLoading}>
          {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Continue with Google
        </Button>
      </CardContent>
    </Card>
  );
}