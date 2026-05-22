"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { mockCustomers, mockEnquiries, mockQuotations } from "@/lib/mock-data";

export default function CustomersPage() {
  const [customers] = useState(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.state.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "All") return matchesSearch;
    return matchesSearch && cust.state === activeTab;
  });

  // Calculate some numbers
  const totalEnquiries = mockEnquiries.length;
  const totalQuotations = mockQuotations.length;

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Contacts & Clients</h1>
          <p className="text-sm text-slate-500 mt-1">Manage customer profiles and historical enquiries</p>
        </div>
        <button className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1a2c42] hover:bg-[#122031] text-white px-4 text-xs font-bold transition-all shadow-md shrink-0">
          <Plus className="h-3.5 w-3.5" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* 2. Top Summary Widget Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 shrink-0">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Accounts</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">{customers.length} Companies</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">verified steel buyers</div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total RFQs Raised</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">{totalEnquiries} Enquiries</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">₹65.2L in value</div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Quotations</div>
          <div className="text-2xl font-black text-purple-600 tracking-tight mt-1">{totalQuotations} Bids</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">awaiting client clearance</div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Lead Conversion</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">48.2%</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">↑ 4.3% this quarter</div>
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
            placeholder="Search client name, company, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
          />
        </div>

        {/* Tabs Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100/50 p-1 rounded-xl border border-slate-200/60 select-none">
          {["All", "Muscat"].map((tab) => (
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

      {/* 4. Contact Table */}
      <div className="flex-grow overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Customer ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">State</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">RFQs / Quotes</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((cust) => {
              const customerEnquiries = mockEnquiries.filter((item) => item.customer === cust.name);
              const customerQuotations = mockQuotations.filter((item) =>
                customerEnquiries.some((enq) => enq.id === item.enquiryId)
              );

              return (
                <tr key={cust.id} className="border-t border-gray-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-700 border-t border-gray-100">{cust.id}</td>
                  <td className="px-4 py-3 text-slate-700 border-t border-gray-100 font-bold">{cust.name}</td>
                  <td className="px-4 py-3 text-slate-700 border-t border-gray-100">{cust.company}</td>
                  <td className="px-4 py-3 text-slate-700 border-t border-gray-100">{cust.email}</td>
                  <td className="px-4 py-3 text-slate-700 border-t border-gray-100">{cust.phone}</td>
                  <td className="px-4 py-3 text-slate-700 border-t border-gray-100">{cust.state}</td>
                  <td className="px-4 py-3 text-slate-700 border-t border-gray-100">{customerEnquiries.length} RFQs • {customerQuotations.length} Quotes</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}