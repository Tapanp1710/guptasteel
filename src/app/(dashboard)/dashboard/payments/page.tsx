"use client";

import { useState } from "react";
import { Eye, Plus, Search } from "lucide-react";

type PaymentStatus = "Pending" | "Received" | "Partial" | "Overdue";

interface Invoice {
  id: string;
  client: string;
  project: string;
  invoiced: number; // in lakhs
  received: number; // in lakhs
  status: PaymentStatus;
  terms: string;
  invoiceDate: string;
  dueDate: string;
}

const initialInvoices: Invoice[] = [
  {
    id: "INV-0148",
    client: "Al Madina Construction LLC",
    project: "Muscat Mall Extension - Phase 2",
    invoiced: 12.6,
    received: 0,
    status: "Pending",
    terms: "Net 30",
    invoiceDate: "14 May 2026",
    dueDate: "13 Jun 2026",
  },
  {
    id: "INV-0147",
    client: "Gulf Steel Works",
    project: "Ruwi Commercial Tower",
    invoiced: 8.4,
    received: 8.4,
    status: "Received",
    terms: "Net 30",
    invoiceDate: "12 May 2026",
    dueDate: "11 Jun 2026",
  },
  {
    id: "INV-0146",
    client: "Oman Builders Co.",
    project: "Seeb Residential Complex",
    invoiced: 15.4,
    received: 8.0,
    status: "Partial",
    terms: "Net 30",
    invoiceDate: "11 May 2026",
    dueDate: "10 Jun 2026",
  },
  {
    id: "INV-0144",
    client: "Muscat Infra Projects",
    project: "Bausher Industrial Park",
    invoiced: 9.6,
    received: 9.6,
    status: "Received",
    terms: "Net 30",
    invoiceDate: "29 Apr 2026",
    dueDate: "29 May 2026",
  },
  {
    id: "INV-0142",
    client: "Gulf Steel Works",
    project: "Ghubra Office Complex",
    invoiced: 4.8,
    received: 4.8,
    status: "Received",
    terms: "Net 30",
    invoiceDate: "25 Apr 2026",
    dueDate: "25 May 2026",
  },
  {
    id: "INV-0139",
    client: "Al Harthy Construction",
    project: "Muscat Hills Villa Complex",
    invoiced: 3.5,
    received: 0.0,
    status: "Overdue",
    terms: "Net 15",
    invoiceDate: "10 Apr 2026",
    dueDate: "25 Apr 2026",
  },
];

export default function PaymentsPage() {
  const [invoices] = useState<Invoice[]>(initialInvoices);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "Received":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Partial":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Overdue":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "Pending":
      default:
        return "bg-sky-50 text-sky-700 border-sky-100";
    }
  };

  const getProgressColor = (status: PaymentStatus) => {
    if (status === "Received") return "bg-emerald-500";
    if (status === "Partial") return "bg-amber-500";
    return "bg-sky-500/20";
  };

  // Filters calculation
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "All") return matchesSearch;
    return matchesSearch && invoice.status === activeTab;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payment Tracker</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor invoices and receivables</p>
        </div>
        <button className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1a2c42] hover:bg-[#122031] text-white px-4 text-xs font-bold transition-all shadow-md shrink-0">
          <Plus className="h-3.5 w-3.5" />
          <span>Add Payment</span>
        </button>
      </div>

      {/* 2. Top Summary Widget Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 shrink-0">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Invoiced</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">₹42.8L</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">across 11 invoices</div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Received</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">₹28.4L</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">payments cleared</div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">₹14.4L</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">across 4 invoices</div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overdue Count</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">3</div>
          <div className="text-[10px] text-rose-600 font-bold mt-0.5">past due date</div>
        </div>
      </div>

      {/* 3. Search and filter tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-[15px] w-[15px] text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search invoice, client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
          />
        </div>

        {/* Tabs Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100/50 p-1 rounded-xl border border-slate-200/60 select-none">
          {["All", "Received", "Pending", "Partial", "Overdue"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab
                  ? "bg-[#1a2c42] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Table Area (independently scrollable) */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-wider uppercase select-none bg-slate-50/50 sticky top-0 z-10">
                <th className="py-3 px-5">Invoice</th>
                <th className="py-3 px-5">Client / Project</th>
                <th className="py-3 px-5 text-right">Invoiced</th>
                <th className="py-3 px-5">Received</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Terms</th>
                <th className="py-3 px-5">Invoice Date</th>
                <th className="py-3 px-5">Due Date</th>
                <th className="py-3 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => {
                  const percentCollected = inv.invoiced > 0 ? (inv.received / inv.invoiced) * 100 : 0;
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Invoice ID */}
                      <td className="py-4 px-5 font-bold text-slate-950">{inv.id}</td>

                      {/* Client/Project */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-slate-800 leading-tight">{inv.client}</div>
                        <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{inv.project}</div>
                      </td>

                      {/* Invoiced Amount */}
                      <td className="py-4 px-5 text-right font-black text-slate-900">
                        ₹{inv.invoiced.toFixed(1)}L
                      </td>

                      {/* Received Amount & Progress Bar */}
                      <td className="py-4 px-5 min-w-[130px]">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 shrink-0">
                            {inv.received > 0 ? `₹${inv.received.toFixed(1)}L` : "₹0K"}
                          </span>
                          <div className="relative h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden shrink-0">
                            <div
                              style={{ width: `${percentCollected}%` }}
                              className={`absolute h-full rounded-full ${getProgressColor(inv.status)}`}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider border ${getStatusColor(inv.status)}`}>
                          {inv.status}
                        </span>
                      </td>

                      {/* Terms */}
                      <td className="py-4 px-5 font-bold text-slate-400">{inv.terms}</td>

                      {/* Invoice Date */}
                      <td className="py-4 px-5 text-slate-500 font-semibold">{inv.invoiceDate}</td>

                      {/* Due Date */}
                      <td className="py-4 px-5 text-slate-500 font-semibold">{inv.dueDate}</td>

                      {/* View Action */}
                      <td className="py-4 px-5 text-center">
                        <button className="h-7 w-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center justify-center">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-bold select-none">
                    No invoices matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
