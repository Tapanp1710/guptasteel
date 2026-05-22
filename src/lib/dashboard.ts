import { mockEnquiries } from "@/lib/mock-data";

export type DashboardEnquirySummary = {
  id: string;
  customer: string;
  product: string;
  qty: number;
  unit: string;
  status: "OPEN" | "QUOTED" | "NEGOTIATION" | "WON" | "LOST";
  assignedTo: string;
  date: string;
};

export type DashboardOverview = {
  totalEnquiries: number;
  openQuotes: number;
  dispatchedOrders: number;
  revenue: number;
  recentEnquiries: DashboardEnquirySummary[];
};

export async function getDashboardOverview(): Promise<DashboardOverview> {
  // Return mock data directly (no database)
  return {
    totalEnquiries: mockEnquiries.length,
    openQuotes: mockEnquiries.filter((e) => e.status === "OPEN").length,
    dispatchedOrders: mockEnquiries.filter((e) => e.status === "WON").length,
    revenue: mockEnquiries.reduce((sum, e) => sum + (e.value || 0), 0),
    recentEnquiries: mockEnquiries.slice(0, 5).map((item) => ({
      id: item.id,
      customer: item.customer,
      product: item.product,
      qty: item.qty,
      unit: item.unit,
      status: item.status as import("@/lib/mock-data").EnquiryStatus,
      assignedTo: item.assignedTo,
      date: item.date,
    })),
  };
}

export async function getAssignableUsers() {
  // Return mock sales executives
  return [
    { id: "2", name: "Karthik Y", email: "karthik@omniasteel.com", role: "SALES_EXECUTIVE" },
    { id: "3", name: "Adil Raaz", email: "adil@omniasteel.com", role: "DISPATCH_MANAGER" },
  ];
}