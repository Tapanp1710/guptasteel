"use client";

import { useState } from "react";
import { PhoneCall, Search, Plus, MessageSquare, User, Calendar, Clock } from "lucide-react";

type FollowUpPriority = "Urgent" | "High" | "Medium" | "Low";
type FollowUpStatus = "Pending" | "Negotiation" | "Completed" | "Overdue";

interface FollowUp {
  id: string;
  customerName: string;
  companyName: string;
  enquiryId: string;
  dealValue: string;
  lastNotes: string;
  callbackDate: string;
  callbackTime: string;
  assignedExecutive: string;
  priority: FollowUpPriority;
  status: FollowUpStatus;
}

const initialFollowUps: FollowUp[] = [
  {
    id: "FLP-101",
    customerName: "Ahmed Al Zadjali",
    companyName: "Muscat Infra Pvt",
    enquiryId: "RFQ-0037",
    dealValue: "₹6.3L",
    lastNotes: "Customer requesting 3% additional cash discount on HR Coil 3mm. Executive to pitch bulk price.",
    callbackDate: "23 May 2026",
    callbackTime: "11:30 AM",
    assignedExecutive: "Adil Raaz",
    priority: "Urgent",
    status: "Pending",
  },
  {
    id: "FLP-102",
    customerName: "Mohammed Al Harthy",
    companyName: "Al Harthy Construction",
    enquiryId: "RFQ-0041",
    dealValue: "₹15.8L",
    lastNotes: "Quotation sent for Beams and TMT bars. Follow up to confirm structural specification approvals.",
    callbackDate: "23 May 2026",
    callbackTime: "02:00 PM",
    assignedExecutive: "Adil Raaz",
    priority: "High",
    status: "Pending",
  },
  {
    id: "FLP-103",
    customerName: "Salim Al Balushi",
    companyName: "Gulf Star Infra",
    enquiryId: "RFQ-0042",
    dealValue: "₹8.6L",
    lastNotes: "Negotiating logistics freight terms. Customer wants delivery included in the base rate.",
    callbackDate: "24 May 2026",
    callbackTime: "10:30 AM",
    assignedExecutive: "Adil Raaz",
    priority: "Medium",
    status: "Negotiation",
  },
  {
    id: "FLP-104",
    customerName: "Khalid Al Rawahi",
    companyName: "Oman Builders Co.",
    enquiryId: "RFQ-0039",
    dealValue: "₹12.1L",
    lastNotes: "Site engineer verified structural ISMB dimensions. Proceeding with price finalization call.",
    callbackDate: "22 May 2026",
    callbackTime: "04:30 PM",
    assignedExecutive: "Karthik Y",
    priority: "High",
    status: "Overdue",
  },
  {
    id: "FLP-105",
    customerName: "Nasser Al Saadi",
    companyName: "Al Madina Construction",
    enquiryId: "RFQ-0035",
    dealValue: "₹24.0L",
    lastNotes: "Deal won! Advance payment schedule aligned. Schedule delivery plan call with logistics.",
    callbackDate: "21 May 2026",
    callbackTime: "11:00 AM",
    assignedExecutive: "Karthik Y",
    priority: "Medium",
    status: "Completed",
  },
];

export default function FollowUpsPage() {
  const [followUps] = useState<FollowUp[]>(initialFollowUps);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const getPriorityStyle = (priority: FollowUpPriority) => {
    switch (priority) {
      case "Urgent":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "High":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Medium":
        return "bg-sky-50 text-sky-700 border-sky-100";
      case "Low":
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const getStatusColor = (status: FollowUpStatus) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Negotiation":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "Overdue":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "Pending":
      default:
        return "bg-blue-50 text-blue-700 border-blue-100";
    }
  };

  const filteredFollowUps = followUps.filter((flp) => {
    const matchesSearch =
      flp.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flp.enquiryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flp.assignedExecutive.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flp.lastNotes.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "All") return matchesSearch;
    return matchesSearch && flp.status === activeTab;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Follow-Ups & Callbacks</h1>
          <p className="text-sm text-slate-500 mt-1">Track active callback schedules and negotiation tasks</p>
        </div>
        <button className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1a2c42] hover:bg-[#122031] text-white px-4 text-xs font-bold transition-all shadow-md shrink-0">
          <Plus className="h-3.5 w-3.5" />
          <span>Schedule Callback</span>
        </button>
      </div>

      {/* 2. Top Summary Widget Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 shrink-0">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Today</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">3 Callbacks</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">covering ₹30.7L in deal pipeline</div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overdue Alerts</div>
          <div className="text-2xl font-black text-rose-600 tracking-tight mt-1">1 Action</div>
          <div className="text-[10px] text-rose-600 font-bold mt-0.5">requires immediate callback</div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">In Negotiation</div>
          <div className="text-2xl font-black text-purple-600 tracking-tight mt-1">4 Deals</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">pricing/freight revisions active</div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Callbacks</div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight mt-1">12 Actions</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">cleared this week</div>
        </div>
      </div>

      {/* 3. Search and filter tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        {/* Search */}
        <div className="relative w-full md:w-85">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-[15px] w-[15px] text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search customer, company, notes, executive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
          />
        </div>

        {/* Tabs Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100/50 p-1 rounded-xl border border-slate-200/60 select-none">
          {["All", "Pending", "Negotiation", "Overdue", "Completed"].map((tab) => (
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
      <div className="flex-grow overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col">
        <div className="flex-grow overflow-y-auto scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-wider uppercase select-none bg-slate-50/50 sticky top-0 z-10">
                <th className="py-3 px-5">Follow-Up ID</th>
                <th className="py-3 px-5">Customer / Company</th>
                <th className="py-3 px-5">Deal Ref</th>
                <th className="py-3 px-5">Scheduled Callback</th>
                <th className="py-3 px-5">Recent Updates & Notes</th>
                <th className="py-3 px-5">Assigned To</th>
                <th className="py-3 px-5">Priority</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
              {filteredFollowUps.length > 0 ? (
                filteredFollowUps.map((flp) => {
                  return (
                    <tr key={flp.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Follow-Up ID */}
                      <td className="py-4 px-5 font-bold text-slate-950">{flp.id}</td>

                      {/* Customer / Company */}
                      <td className="py-4 px-5 min-w-[150px]">
                        <div className="font-bold text-slate-800 leading-tight">{flp.customerName}</div>
                        <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{flp.companyName}</div>
                      </td>

                      {/* Deal ID & Value */}
                      <td className="py-4 px-5">
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10.5px] font-bold text-slate-700">
                          {flp.enquiryId}
                        </span>
                        <div className="text-[10px] font-black text-slate-900 mt-1">{flp.dealValue}</div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-5 min-w-[150px]">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{flp.callbackDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold mt-1">
                          <Clock className="h-3 w-3 text-slate-300 shrink-0" />
                          <span>{flp.callbackTime}</span>
                        </div>
                      </td>

                      {/* Notes / Last Status */}
                      <td className="py-4 px-5 max-w-[280px]">
                        <p className="line-clamp-2 text-slate-500 font-medium leading-relaxed">
                          {flp.lastNotes}
                        </p>
                      </td>

                      {/* Assigned Executive */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                          <User className="h-3.5 w-3.5 text-slate-400" />
                          <span>{flp.assignedExecutive}</span>
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="py-4 px-5">
                        <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider border ${getPriorityStyle(flp.priority)}`}>
                          {flp.priority}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider border ${getStatusColor(flp.status)}`}>
                          {flp.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="h-7 w-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center justify-center" title="Log Call/Update">
                            <PhoneCall className="h-3.5 w-3.5" />
                          </button>
                          <button className="h-7 w-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center justify-center" title="Send WhatsApp">
                            <MessageSquare className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-bold select-none">
                    No callbacks matching the selected filters.
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
