import type { ReactNode } from "react";
import { Building2 } from "lucide-react";
import { appName } from "@/lib/constants";

type DesktopOnlyGateProps = {
  children: ReactNode;
};

export function DesktopOnlyGate({ children }: DesktopOnlyGateProps) {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#0f172a_0%,#1e293b_100%)] px-6 text-slate-100 lg:hidden">
        <div className="steel-panel w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 text-center text-slate-100">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white">
            <Building2 className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Desktop only</h1>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            {appName} is optimized for desktop workflows. Please open this app on a
            larger screen to manage enquiries, quotations, dispatch, and reports.
          </p>
        </div>
      </div>
      <div className="hidden lg:block">{children}</div>
    </>
  );
}