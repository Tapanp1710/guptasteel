"use client";

import { useState } from "react";
import { FileText, Search, Plus, FileDown, Calendar, Mail } from "lucide-react";
import { mockQuotations, mockEnquiries } from "@/lib/mock-data";
import { quotationStatusMeta } from "@/lib/constants";

type QuotationStatus = "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED";

export default function QuotationsPage() {
  const [quotations] = useState(mockQuotations);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");

  const getStatusColor = (status: QuotationStatus) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "SENT":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "REJECTED":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "DRAFT":
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const getClientName = (enquiryId: string) => {
    const enq = mockEnquiries.find((e) => e.id === enquiryId);
    return enq ? { name: enq.customer, company: enq.company } : { name: "Unknown Customer", company: "Unknown Company" };
  };

  const filteredQuotations = quotations.filter((q) => {
    const client = getClientName(q.enquiryId);
    const matchesSearch =
      q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.enquiryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "All") return matchesSearch;
    return matchesSearch && q.status === activeTab;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Quotations Master</h1>
          <p className="text-sm text-slate-500 mt-1">Create, review, and track active steel quotations</p>
        </div>
        <button className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1a2c42] hover:bg-[#122031] text-white px-4 text-xs font-bold transition-all shadow-md shrink-0">
          <Plus className="h-3.5 w-3.5" />
          <span>New Quotation</span>
        </button>
      </div>

      {/* 2. Top Summary Widget Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 shrink-0">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Quotations</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">{quotations.length} Bids</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">raised this quarter</div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accepted deals</div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight mt-1">
            {quotations.filter((q) => q.status === "ACCEPTED").length} Won
          </div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">converted to orders</div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sent & Pending</div>
          <div className="text-2xl font-black text-blue-600 tracking-tight mt-1">
            {quotations.filter((q) => q.status === "SENT").length} Active
          </div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">awaiting customer approvals</div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Bid Value</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">₹15.2L</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">average ticket size</div>
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
            placeholder="Search quotation ID, RFQ, customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
          />
        </div>

        {/* Tabs Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100/50 p-1 rounded-xl border border-slate-200/60 select-none">
          {["All", "DRAFT", "SENT", "ACCEPTED", "REJECTED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab
                  ? "bg-[#1a2c42] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab === "All" ? "All" : quotationStatusMeta[tab as QuotationStatus]?.label || tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Table Area (independently scrollable) */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Quotation ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Enquiry ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Customer / Company</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase bg-gray-50">Quoted Value</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Validity Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Status</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase bg-gray-50">Actions</th>
            </tr>
          </thead>
          <tbody>
              {filteredQuotations.length > 0 ? (
                filteredQuotations.map((q) => {
                  const client = getClientName(q.enquiryId);
                  return (
                    <tr key={q.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Quotation ID */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100 font-bold flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span>{q.id}</span>
                      </td>

                      {/* Enquiry ID */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100">
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10.5px] font-bold text-slate-700">
                          {q.enquiryId}
                        </span>
                      </td>

                      {/* Customer / Company */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100">
                        <div className="font-bold text-slate-800 leading-tight">{client.name}</div>
                        <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{client.company}</div>
                      </td>

                      {/* Quoted Total Value */}
                      <td className="px-4 py-3 text-right text-slate-700 border-t border-gray-100 font-black">
                        ₹{q.total.toLocaleString("en-IN")}
                      </td>

                      {/* Validity Date */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{q.validityDate}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100">
                        <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider border ${getStatusColor(q.status as QuotationStatus)}`}>
                          {quotationStatusMeta[q.status as QuotationStatus]?.label || q.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-center text-slate-700 border-t border-gray-100">
                        <div className="flex items-center justify-center gap-1">
                          <button className="h-7 w-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center justify-center" title="Print Quotation PDF">
                            <FileDown className="h-3.5 w-3.5" />
                          </button>
                          <button className="h-7 w-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center justify-center" title="Email Quotation">
                            <Mail className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-bold select-none">
                    No quotations matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}