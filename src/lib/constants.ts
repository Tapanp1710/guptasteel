// Local types to keep runtime free from Prisma
export type EnquiryStatus = "OPEN" | "QUOTED" | "NEGOTIATION" | "WON" | "LOST";
export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type DispatchStatus = "PENDING" | "IN_TRANSIT" | "DELIVERED";
export type QuotationStatus = "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED";
export type UserRole = "ADMIN" | "SALES_EXECUTIVE" | "DISPATCH_MANAGER";

export const appName = "Omnia Steels CRM";

export const steelPalette = {
  navy: "#0F172A",
  blue: "#2563EB",
  gray: "#F1F5F9",
} as const;

export const roles: UserRole[] = ["ADMIN", "SALES_EXECUTIVE", "DISPATCH_MANAGER"];

export const enquiryStatuses: EnquiryStatus[] = ["OPEN", "QUOTED", "NEGOTIATION", "WON", "LOST"];

export const priorityLevels: Priority[] = ["LOW", "MEDIUM", "HIGH"];

export const quotationStatuses: QuotationStatus[] = ["DRAFT", "SENT", "ACCEPTED", "REJECTED"];

export const dispatchStatuses: DispatchStatus[] = ["PENDING", "IN_TRANSIT", "DELIVERED"];

export const productCategories = [
  "HR Coil",
  "CR Coil",
  "TMT Bars",
  "Angles",
  "Channels",
  "Plates",
  "Pipes",
  "Beams",
  "Sheets",
] as const;

export const quantityUnits = ["MT", "Nos", "Sheets"] as const;

export const enquiryStatusMeta: Record<EnquiryStatus, { label: string; className: string }> = {
  OPEN: { label: "Open", className: "bg-sky-100 text-sky-800" },
  QUOTED: { label: "Quoted", className: "bg-blue-100 text-blue-800" },
  NEGOTIATION: { label: "Negotiation", className: "bg-amber-100 text-amber-800" },
  WON: { label: "Won", className: "bg-emerald-100 text-emerald-800" },
  LOST: { label: "Lost", className: "bg-rose-100 text-rose-800" },
};

export const dispatchStatusMeta: Record<DispatchStatus, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-slate-100 text-slate-800" },
  IN_TRANSIT: { label: "In Transit", className: "bg-amber-100 text-amber-800" },
  DELIVERED: { label: "Delivered", className: "bg-emerald-100 text-emerald-800" },
};

export const quotationStatusMeta: Record<QuotationStatus, { label: string; className: string }> = {
  DRAFT: { label: "Draft", className: "bg-slate-100 text-slate-800" },
  SENT: { label: "Sent", className: "bg-blue-100 text-blue-800" },
  ACCEPTED: { label: "Accepted", className: "bg-emerald-100 text-emerald-800" },
  REJECTED: { label: "Rejected", className: "bg-rose-100 text-rose-800" },
};

export const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/enquiries", label: "Enquiries" },
  { href: "/dashboard/new-enquiry", label: "New Enquiry" },
  { href: "/dashboard/quotations", label: "Quotations" },
  { href: "/dashboard/customers", label: "Customers" },
  { href: "/dashboard/dispatch", label: "Dispatch" },
  { href: "/dashboard/reports", label: "Reports" },
  { href: "/dashboard/settings", label: "Settings" },
] as const;