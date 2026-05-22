"use client";

import { useState } from "react";
import { Search, Plus, Eye, Calendar, CheckCircle, Phone } from "lucide-react";
import { mockDispatches } from "@/lib/mock-data";
import { dispatchStatusMeta } from "@/lib/constants";

type DispatchStatus = "PENDING" | "IN_TRANSIT" | "DELIVERED";

export default function DispatchPage() {
  const [dispatches] = useState(mockDispatches);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");

  const getStatusColor = (status: DispatchStatus) => {
    switch (status) {
      case "DELIVERED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "IN_TRANSIT":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "PENDING":
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const filteredDispatches = dispatches.filter((disp) => {
    const matchesSearch =
      disp.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disp.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disp.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disp.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disp.orderId.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "All") return matchesSearch;
    return matchesSearch && disp.status === activeTab;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Logistics & Dispatch</h1>
          <p className="text-sm text-slate-500 mt-1">Track shipments, vehicles, and delivery schedules</p>
        </div>
        <button className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1a2c42] hover:bg-[#122031] text-white px-4 text-xs font-bold transition-all shadow-md shrink-0">
          <Plus className="h-3.5 w-3.5" />
          <span>New Dispatch</span>
        </button>
      </div>

      {/* 2. Top Summary Widget Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 shrink-0">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Shipments</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">{dispatches.length} Orders</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">dispatched this month</div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">In Transit</div>
          <div className="text-2xl font-black text-amber-500 tracking-tight mt-1">
            {dispatches.filter((d) => d.status === "IN_TRANSIT").length} Loads
          </div>
          <div className="text-[10px] text-amber-600 font-bold mt-0.5">on active routes</div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Dispatch</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            {dispatches.filter((d) => d.status === "PENDING").length} Cargoes
          </div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">awaiting driver assignment</div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Delivery Rate</div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight mt-1">98.4%</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">on-time deliveries</div>
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
            placeholder="Search order ref, customer, truck, driver..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
          />
        </div>

        {/* Tabs Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100/50 p-1 rounded-xl border border-slate-200/60 select-none">
          {["All", "PENDING", "IN_TRANSIT", "DELIVERED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab
                  ? "bg-[#1a2c42] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab === "All" ? "All" : dispatchStatusMeta[tab as DispatchStatus]?.label || tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Table Area (independently scrollable) */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Cargo Material</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase bg-gray-50">Cargo Weight</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Vehicle No</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Driver Contact</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Expected Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-gray-50">Status</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase bg-gray-50">Actions</th>
            </tr>
          </thead>
          <tbody>
              {filteredDispatches.length > 0 ? (
                filteredDispatches.map((disp) => {
                  return (
                    <tr key={disp.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Order Ref / Dispatch ID */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100 font-bold">{disp.orderId}</td>

                      {/* Customer */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100">
                        <div className="font-bold text-slate-800 leading-tight">{disp.customer}</div>
                        <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Dest: Site Address</div>
                      </td>

                      {/* Cargo Material */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100 font-bold">{disp.product}</td>

                      {/* Cargo Weight */}
                      <td className="px-4 py-3 text-right text-slate-700 border-t border-gray-100 font-black">
                        {disp.qty} MT
                      </td>

                      {/* Vehicle Number */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100">
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10.5px] font-bold text-slate-700 font-mono tracking-wide">
                          {disp.vehicleNo}
                        </span>
                      </td>

                      {/* Driver & Phone */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100">
                        <div className="font-bold text-slate-800 leading-tight">{disp.driverName}</div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold mt-0.5">
                          <Phone className="h-3 w-3 text-slate-300" />
                          <span>{disp.driverPhone}</span>
                        </div>
                      </td>

                      {/* Expected Date */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{disp.expectedDeliveryDate}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-slate-700 border-t border-gray-100">
                        <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider border ${getStatusColor(disp.status as DispatchStatus)}`}>
                          {dispatchStatusMeta[disp.status as DispatchStatus]?.label || disp.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-center text-slate-700 border-t border-gray-100">
                        <div className="flex items-center justify-center gap-1">
                          <button className="h-7 w-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center justify-center" title="View Waybill">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="h-7 w-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center justify-center" title="Update status">
                            <CheckCircle className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-bold select-none">
                    No dispatches matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}