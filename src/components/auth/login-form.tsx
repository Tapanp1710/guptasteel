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
    <Card className="mx-auto w-full max-w-md border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300">
      <CardHeader className="border-b-0 pb-2">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-950/20 border border-orange-300/30">
          <Shield className="h-5 w-5" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Sign in to Omnia Steels CRM</CardTitle>
        <CardDescription className="text-slate-500">
          Use your email/password or Google account to access the steel trade workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <form className="space-y-4" onSubmit={submitCredentials}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="you@omnia.com"
                className="pl-9 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                {...register("email")}
              />
            </div>
            {errors.email ? <p className="text-xs text-rose-600 font-medium">{errors.email.message}</p> : null}
          </div>
 
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              {...register("password")}
            />
            {errors.password ? <p className="text-xs text-rose-600 font-medium">{errors.password.message}</p> : null}
          </div>
 
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md shadow-orange-950/20 transition-all font-semibold hover:scale-[1.01] active:scale-[0.99]"
            disabled={isSubmitting || googleLoading}
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            Sign in
          </Button>
        </form>
 
        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          or
          <span className="h-px flex-1 bg-slate-200" />
        </div>
 
        <Button
          type="button"
          variant="outline"
          className="w-full hover:bg-slate-50 transition-colors border-slate-300 font-medium text-slate-700"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
        >
          {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Continue with Google
        </Button>
      </CardContent>
    </Card>

  );
}