"use client";

import { useState } from "react";
import { Search, Plus, Eye, Phone, MapPin, Truck } from "lucide-react";

type TransporterStatus = "Active" | "En-Route" | "Available" | "Suspended";
type FleetType = "Flatbed Trailer" | "Multi-Axle Truck" | "10-Wheeler Heavy" | "6-Wheeler Medium";

interface Transporter {
  id: string;
  name: string;
  fleetType: FleetType;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  primaryRoute: string;
  ratePerMT: number; // in Rupees per MT
  status: TransporterStatus;
  rating: number;
}

const initialTransporters: Transporter[] = [
  {
    id: "TRP-0081",
    name: "Gupta Logistics & Roadlines",
    fleetType: "Flatbed Trailer",
    vehicleNo: "MH-04-GP-8831",
    driverName: "Rajesh Kumar Yadav",
    driverPhone: "+91 98234 11204",
    primaryRoute: "Mumbai (MH) to Raipur (CG)",
    ratePerMT: 2850,
    status: "En-Route",
    rating: 4.8,
  },
  {
    id: "TRP-0082",
    name: "Om Sai Freight Carriers",
    fleetType: "Multi-Axle Truck",
    vehicleNo: "CG-07-AS-5412",
    driverName: "Sohan Singh",
    driverPhone: "+91 88765 99310",
    primaryRoute: "Raigarh (CG) to Pune (MH)",
    ratePerMT: 3100,
    status: "Available",
    rating: 4.6,
  },
  {
    id: "TRP-0083",
    name: "Balaji Steel Transport",
    fleetType: "10-Wheeler Heavy",
    vehicleNo: "JH-05-BL-2290",
    driverName: "Manpreet Singh",
    driverPhone: "+91 99120 44589",
    primaryRoute: "Jamshedpur (JH) to Nagpur (MH)",
    ratePerMT: 2600,
    status: "Active",
    rating: 4.9,
  },
  {
    id: "TRP-0084",
    name: "National Heavy Haulage",
    fleetType: "Flatbed Trailer",
    vehicleNo: "GJ-01-XX-9045",
    driverName: "Vikram Rathore",
    driverPhone: "+91 76009 12389",
    primaryRoute: "Hazira (GJ) to Indore (MP)",
    ratePerMT: 1950,
    status: "Available",
    rating: 4.7,
  },
  {
    id: "TRP-0085",
    name: "Deccan Express Logistics",
    fleetType: "6-Wheeler Medium",
    vehicleNo: "KA-03-DE-1178",
    driverName: "K. Ranganath",
    driverPhone: "+91 94480 77310",
    primaryRoute: "Bengaluru (KA) to Chennai (TN)",
    ratePerMT: 1450,
    status: "En-Route",
    rating: 4.5,
  },
  {
    id: "TRP-0086",
    name: "Sher-e-Punjab Roadlines",
    fleetType: "Multi-Axle Truck",
    vehicleNo: "PB-10-SP-6632",
    driverName: "Gurpreet Singh Gill",
    driverPhone: "+91 98140 22356",
    primaryRoute: "Ludhiana (PB) to Delhi NCR",
    ratePerMT: 1150,
    status: "Suspended",
    rating: 4.2,
  },
];

export default function TransportersPage() {
  const [transporters] = useState<Transporter[]>(initialTransporters);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: TransporterStatus) => {
    switch (status) {
      case "Available":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "En-Route":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Active":
        return "bg-sky-50 text-sky-700 border-sky-100";
      case "Suspended":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const filteredTransporters = transporters.filter((trp) => {
    const matchesSearch =
      trp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trp.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trp.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trp.primaryRoute.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trp.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "All") return matchesSearch;
    return matchesSearch && trp.status === activeTab;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Transporters & Fleets</h1>
          <p className="text-sm text-slate-500 mt-1">Track fleet details, transporter contacts, and shipping rates</p>
        </div>
        <button className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1a2c42] hover:bg-[#122031] text-white px-4 text-xs font-bold transition-all shadow-md shrink-0">
          <Plus className="h-3.5 w-3.5" />
          <span>Add Transporter</span>
        </button>
      </div>

      {/* 2. Top Summary Widget Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 shrink-0">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Partners</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">14 Companies</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">covering 38 logistics routes</div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Trucks</div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight mt-1">5 Fleet units</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">ready for immediate dispatch</div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">En-Route (In Transit)</div>
          <div className="text-2xl font-black text-amber-500 tracking-tight mt-1">8 Trucks</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">active deliveries on road</div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between h-[104px]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Shipping Cost</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">₹2,183/MT</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">weighted average regional freight</div>
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
            placeholder="Search transporter, route, driver, truck..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-slate-300 focus:outline-none transition-all shadow-sm"
          />
        </div>

        {/* Tabs Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100/50 p-1 rounded-xl border border-slate-200/60 select-none">
          {["All", "Available", "En-Route", "Active", "Suspended"].map((tab) => (
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
                <th className="py-3 px-5">Transporter ID</th>
                <th className="py-3 px-5">Transporter / Fleet</th>
                <th className="py-3 px-5">Vehicle No</th>
                <th className="py-3 px-5">Driver Contact</th>
                <th className="py-3 px-5">Primary Route Covered</th>
                <th className="py-3 px-5 text-right">Freight Rate</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-center">Score</th>
                <th className="py-3 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
              {filteredTransporters.length > 0 ? (
                filteredTransporters.map((trp) => {
                  return (
                    <tr key={trp.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Transporter ID */}
                      <td className="py-4 px-5 font-bold text-slate-950">{trp.id}</td>

                      {/* Name / Fleet */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-slate-800 leading-tight">{trp.name}</div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold mt-0.5">
                          <Truck className="h-3 w-3 text-slate-300" />
                          <span>{trp.fleetType}</span>
                        </div>
                      </td>

                      {/* Vehicle Number */}
                      <td className="py-4 px-5">
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10.5px] font-bold text-slate-700 font-mono tracking-wide">
                          {trp.vehicleNo}
                        </span>
                      </td>

                      {/* Driver & Phone */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-slate-800 leading-tight">{trp.driverName}</div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold mt-0.5">
                          <Phone className="h-3 w-3 text-slate-300" />
                          <span>{trp.driverPhone}</span>
                        </div>
                      </td>

                      {/* Primary Route */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{trp.primaryRoute}</span>
                        </div>
                      </td>

                      {/* Shipping Freight Rate */}
                      <td className="py-4 px-5 text-right font-black text-slate-900">
                        ₹{trp.ratePerMT.toLocaleString("en-IN")}/MT
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider border ${getStatusColor(trp.status)}`}>
                          {trp.status}
                        </span>
                      </td>

                      {/* Rating Score */}
                      <td className="py-4 px-5 text-center">
                        <div className="inline-flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-[10.5px] font-extrabold text-amber-700 border border-amber-100">
                          ★ <span>{trp.rating}</span>
                        </div>
                      </td>

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
                    No transporters matching the selected filters.
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
