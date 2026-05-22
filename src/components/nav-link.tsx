"use client";

import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  activeClassName?: string;
}

export function NavLink({ href, className, activeClassName, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const hrefValue = typeof href === "string" ? href : href.pathname ?? "";
  const isActive = hrefValue === "/dashboard"
    ? pathname === "/dashboard"
    : pathname === hrefValue || pathname?.startsWith(`${hrefValue}/`);

  return (
    <Link
      href={href}
      prefetch={true}
      className={cn(className, isActive ? activeClassName : undefined)}
      {...props}
    />
  );
}
