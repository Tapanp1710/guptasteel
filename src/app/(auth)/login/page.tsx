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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50/50 px-6 py-12">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-orange-200/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-[450px] w-[450px] rounded-full bg-zinc-200/40 blur-[100px] pointer-events-none" />

      <div className="relative z-10 grid w-full max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left Branding Section */}
        <section className="relative overflow-hidden rounded-[2rem] bg-zinc-950 p-8 text-white lg:p-12 border border-zinc-800/80 shadow-2xl flex flex-col justify-between min-h-[500px]">
          {/* Subtle Orange Glow in top right */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-[100px] pointer-events-none" />
          {/* Subtle Zinc Glow in bottom left */}
          <div className="absolute -left-10 -bottom-10 h-72 w-72 rounded-full bg-zinc-800/30 blur-[80px] pointer-events-none" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-12">
            <Logo />
            <div className="max-w-xl space-y-6">
              <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
                Omnia Steels CRM
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-white lg:text-[52px] lg:leading-[1.15]">
                Trade operations built for <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">steel sales teams</span>.
              </h1>
              <p className="max-w-lg text-sm leading-7 text-zinc-400 lg:text-base">
                Track enquiries, generate quotations, coordinate dispatch, and keep every customer conversation in one desktop workspace.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Role access", "Admin, Sales Executive, Dispatch Manager"],
                ["Quotation flow", "Draft to accepted with PDF ready outputs"],
                ["Reporting", "Pipeline, revenue, and executive performance"],
              ].map(([title, description]) => (
                <div key={title} className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-4 backdrop-blur-sm hover:border-zinc-700/60 transition-all duration-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-orange-400">{title}</div>
                  <div className="mt-1.5 text-xs leading-5 text-zinc-400">{description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Form Section */}
        <section className="flex items-center justify-center">
          <LoginForm />
        </section>
      </div>
    </div>
  );

}