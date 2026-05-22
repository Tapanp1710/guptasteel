"use client";

import type { ReactNode } from "react";
import type { Session } from "next-auth";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { usePathname } from "next/navigation";

type AppShellProps = {
  session: Session;
  children: ReactNode;
};

const titles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome, Let's dive into today's stats",
  },
  "/dashboard/new-enquiry": {
    title: "New Enquiry",
    subtitle: "Capture demand details and assign the right executive.",
  },
  "/dashboard/enquiries": {
    title: "CRM / RFQ Management",
    subtitle: "Track enquiries, pricing negotiations and dispatch",
  },
  "/dashboard/customers": {
    title: "Contacts",
    subtitle: "Manage customers and communications.",
  },
  "/dashboard/materials": {
    title: "Materials Master",
    subtitle: "Manage your steel products, grades, and base prices.",
  },
  "/dashboard/dispatch": {
    title: "Logistics / Dispatch",
    subtitle: "Track shipments, vehicles, and delivery schedules.",
  },
  "/dashboard/logistics": {
    title: "Logistics",
    subtitle: "Logistics module under development.",
  },
  "/dashboard/vendors": {
    title: "Vendors",
    subtitle: "Manage steel supplier and mill records.",
  },
  "/dashboard/transporters": {
    title: "Transporters",
    subtitle: "Track fleet details, transporter contacts, and shipping rates.",
  },
  "/dashboard/quotations": {
    title: "Quotations",
    subtitle: "Create, review, and track active steel quotations.",
  },
  "/dashboard/follow-ups": {
    title: "Follow-Ups",
    subtitle: "Track active callback schedules and negotiation tasks.",
  },
  "/dashboard/payments": {
    title: "Payment Tracker",
    subtitle: "Monitor invoices and receivables",
  },
  "/dashboard/price-calculator": {
    title: "Price Calculator",
    subtitle: "Calculate sell price, margin and GST for steel items",
  },
  "/dashboard/whatsapp-generator": {
    title: "WhatsApp Message Generator",
    subtitle: "Generate and send trade communications over WhatsApp.",
  },
  "/dashboard/settings": {
    title: "Admin Settings",
    subtitle: "Manage users, profiles, categories, and smtp configurations.",
  },
};

export function AppShell({ session, children }: AppShellProps) {
  const pathname = usePathname();
  const routeTitle = titles[pathname] ?? { title: "Omnia Steels CRM", subtitle: "Steel trade workflows in one place." };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8fafc] text-slate-950 font-sans">
      <Sidebar />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <Header title={routeTitle.title} subtitle={routeTitle.subtitle} session={session} />
        <main className="flex-1 overflow-auto p-6 bg-slate-50">{children}</main>
      </div>
    </div>
  );
}