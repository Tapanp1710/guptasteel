import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { appName } from "@/lib/constants";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-950/20 border border-orange-300/30">
        <Building2 className="h-5 w-5" />
      </div>
      {!compact ? (
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Omnia</div>
          <div className="text-lg font-semibold text-white">{appName}</div>
        </div>
      ) : null}
    </div>
  );
}