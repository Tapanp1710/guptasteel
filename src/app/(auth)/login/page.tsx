import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/logo";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="steel-panel relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,64,175,0.96))] p-8 text-white lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <Logo />
            <div className="max-w-xl space-y-6">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-200">
                Omnia Steels CRM
              </span>
              <h1 className="text-4xl font-semibold tracking-tight lg:text-6xl">
                Trade operations built for steel sales teams.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-slate-200 lg:text-base">
                Track enquiries, generate quotations, coordinate dispatch, and keep every customer conversation in one desktop workspace.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Role access", "Admin, Sales Executive, Dispatch Manager"],
                ["Quotation flow", "Draft to accepted with PDF ready outputs"],
                ["Reporting", "Pipeline, revenue, and executive performance"],
              ].map(([title, description]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="text-sm font-medium text-white">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-200">{description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <LoginForm />
        </section>
      </div>
    </div>
  );
}