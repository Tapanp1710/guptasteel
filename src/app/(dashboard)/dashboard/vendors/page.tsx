"use client";

import { useState } from "react";
import { Search, Plus, SlidersHorizontal, Award, Mail, Phone, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VendorItem {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  location: string;
  status: "Preferred" | "Approved" | "Certified";
}

const initialVendors: VendorItem[] = [
  { id: "VND-001", name: "JSW Steel Ltd", specialty: "HR & CR Coils, Sheets", email: "supplies@jsw.com", phone: "+91 22 6867 0000", location: "Mumbai, MH", status: "Preferred" },
  { id: "VND-002", name: "Steel Authority of India (SAIL)", specialty: "Heavy Structural Beams, Channels", email: "sales@sail.co.in", phone: "+91 11 2246 7200", location: "Bhilai, CG", status: "Certified" },
  { id: "VND-003", name: "Jindal Steel & Power (JSPL)", specialty: "Plates, Angles, Rail Sections", email: "commercial@jindalsteel.com", phone: "+91 12 4661 2000", location: "Raigarh, CG", status: "Approved" },
  { id: "VND-004", name: "TATA Steel Ltd", specialty: "Premium TMT Bars, Wire Rods", email: "orders@tatasteel.com", phone: "+91 65 7242 3300", location: "Jamshedpur, JH", status: "Preferred" },
];

export default function VendorsPage() {
  const [vendors] = useState<VendorItem[]>(initialVendors);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVendors = vendors.filter(
    (vnd) =>
      vnd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vnd.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vnd.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Preferred":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Certified":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "Approved":
      default:
        return "bg-blue-50 text-blue-700 border-blue-100";
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Vendors</h1>
          <p className="text-sm text-slate-500 mt-1">Manage steel supplier and mill records</p>
        </div>
        <button className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1a2c42] hover:bg-[#122031] text-white px-4 text-xs font-bold transition-all shadow-md shrink-0">
          <Plus className="h-3.5 w-3.5" />
          <span>Add Vendor</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-[15px] w-[15px] text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search vendor, specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
          />
        </div>
        <button className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
          <span>Filter</span>
        </button>
      </div>

      {/* Grid (scrollable) */}
      <div className="flex-grow overflow-y-auto pr-1 pb-4 scrollbar-thin">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
          {filteredVendors.map((vnd) => (
            <div
              key={vnd.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[190px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-slate-100 bg-slate-50 px-1.5 py-0.5 text-[9px] font-bold text-slate-500 tracking-wider">
                    {vnd.id}
                  </span>
                  <Badge variant="outline" className={`border text-[9px] font-extrabold tracking-wider ${getStatusStyle(vnd.status)}`}>
                    {vnd.status}
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-slate-950 mt-3 truncate">{vnd.name}</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1 font-bold">
                  <Award className="h-3 w-3 text-slate-400 shrink-0" />
                  <span>Specialty: {vnd.specialty}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-medium text-slate-500">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                  <span className="truncate">{vnd.email}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                  <span className="truncate">{vnd.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                  <span className="truncate">{vnd.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
