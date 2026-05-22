"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Kanban,
  Users,
  Package,
  Store,
  Navigation,
  FileText,
  PhoneCall,
  CreditCard,
  Calculator,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/nav-link";

const sections = [
  {
    label: "ENQUIRIES",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "New Enquiry", href: "/dashboard/new-enquiry", icon: PlusCircle },
      { label: "CRM / RFQ", href: "/dashboard/enquiries", icon: Kanban },
    ],
  },
  {
    label: "MASTERS",
    items: [
      { label: "Contacts", href: "/dashboard/customers", icon: Users },
      { label: "Materials", href: "/dashboard/materials", icon: Package },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { label: "Vendors", href: "/dashboard/vendors", icon: Store },
      { label: "Transporters", href: "/dashboard/transporters", icon: Navigation },
    ],
  },
  {
    label: "SALES",
    items: [
      { label: "Quotations", href: "/dashboard/quotations", icon: FileText },
      { label: "Follow-Ups", href: "/dashboard/follow-ups", icon: PhoneCall },
      { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
      { label: "Price Calculator", href: "/dashboard/price-calculator", icon: Calculator },
      { label: "WhatsApp Generator", href: "/dashboard/whatsapp-generator", icon: MessageCircle },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { label: "Admin Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="sidebar sticky top-0 hidden h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-900 text-zinc-300 lg:flex select-none">
      {/* Sidebar Header with Hexagonal S Logo */}
      <div className="border-b border-zinc-800 px-6 py-[22px]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md border border-orange-300">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-white stroke-[2]">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
              <path d="M9 9.5c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5" />
            </svg>
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-white">Omnia Steels</div>
            <div className="text-[10px] uppercase tracking-widest text-orange-500 font-semibold">Steel CRM</div>
          </div>
        </div>
      </div>

      {/* Main Nav Links (Scrollable if needed, custom scrollbar) */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="mb-2 px-3 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">{section.label}</div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = pathname === item.href || (item.href === "/dashboard" && pathname === "/dashboard");
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200 group"
                    activeClassName="bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600"
                  >
                    <Icon
                      className={cn(
                        "h-[16px] w-[16px] transition-colors",
                        active ? "text-white" : "text-zinc-400 group-hover:text-white"
                      )}
                    />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Profile Footer */}
      <div className="border-t border-zinc-800 p-4 bg-zinc-950 flex items-center justify-between text-zinc-300">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-9 w-9 rounded-full overflow-hidden bg-orange-500 border border-orange-400 flex items-center justify-center text-white font-bold shadow-inner">
            <span className="text-xs">{session?.user?.name?.charAt(0) || "A"}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold text-white leading-tight truncate">{session?.user?.name || "Admin"}</div>
            <div className="text-[10px] text-zinc-400 truncate leading-none mt-0.5">{session?.user?.email || "admin@omniasteel.com"}</div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          title="Sign Out"
          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-orange-500 transition-colors"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}