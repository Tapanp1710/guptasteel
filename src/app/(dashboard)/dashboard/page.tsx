"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  Coins,
  Truck,
  PhoneCall,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
  PlusCircle,
  FileSpreadsheet,
  SlidersHorizontal,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const [timeState, setTimeState] = useState({
    dateStr: "22 May",
    dayStr: "Friday",
    timeStr: "08:18 PM",
  });

  // Dynamic Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const optionsDate: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
      const optionsDay: Intl.DateTimeFormatOptions = { weekday: "long" };
      const optionsTime: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

      setTimeState({
        dateStr: now.toLocaleDateString("en-US", optionsDate),
        dayStr: now.toLocaleDateString("en-US", optionsDay),
        timeStr: now.toLocaleTimeString("en-US", optionsTime),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: "Total Enquiries",
      value: "142",
      badge: "+18% ▲",
      badgeType: "success",
      sub: "this month",
      icon: FileText,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Pending Quotations",
      value: "23",
      badge: "+4 ▼",
      badgeType: "danger",
      sub: "awaiting quote",
      icon: Clock,
      color: "bg-rose-500/10 text-rose-600",
    },
    {
      title: "Sent Quotations",
      value: "67",
      badge: "+9% ▲",
      badgeType: "success",
      sub: "awaiting response",
      icon: FileSpreadsheet,
      color: "bg-sky-500/10 text-sky-600",
    },
    {
      title: "Follow-ups Due",
      value: "8",
      badge: "urgent ▼",
      badgeType: "danger",
      sub: "action required today",
      icon: PhoneCall,
      color: "bg-red-500/10 text-red-600",
    },
    {
      title: "Payments Pending",
      value: "₹14.2L",
      badge: "+2.1L ▼",
      badgeType: "danger",
      sub: "across 6 invoices",
      icon: Coins,
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      title: "In Transit",
      value: "12",
      badge: "+3 ▲",
      badgeType: "success",
      sub: "active shipments",
      icon: Truck,
      color: "bg-indigo-500/10 text-indigo-600",
    },
    {
      title: "Deals Won",
      value: "34",
      badge: "71% ▲",
      badgeType: "success",
      sub: "conversion rate",
      icon: CheckCircle2,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: "Total Revenue",
      value: "₹2.4Cr",
      badge: "+22% ▲",
      badgeType: "success",
      sub: "vs last quarter",
      icon: DollarSign,
      color: "bg-purple-500/10 text-purple-600",
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden select-none space-y-6 p-6 w-full pb-8 animate-in fade-in duration-300">
      {/* 1. Header welcome block & Live clock */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/50 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome, let&apos;s dive into today&apos;s stats</p>
        </div>

        {/* Live Date/Time widget */}
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-3 shadow-sm select-none shrink-0 min-w-[200px]">
          <div className="text-right">
            <div className="text-lg font-bold text-slate-950 leading-none">{timeState.dateStr}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{timeState.dayStr}</div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-xl font-black text-slate-800 tracking-tight leading-none">
            {timeState.timeStr}
          </div>
        </div>
      </div>

      {/* 2. Performance Over Time Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">Performance Over Time</h2>
            <p className="text-[11px] text-slate-400 font-bold tracking-wide mt-0.5">22 May, 2026</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-all select-none">
              <SlidersHorizontal className="h-3 w-3 text-slate-500" />
              <span>Sort</span>
            </button>
            <button className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-all select-none">
              <SlidersHorizontal className="h-3 w-3 text-slate-500" />
              <span>Filter</span>
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-400">
              •••
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className={`w-full min-h-[120px] p-5 flex flex-col justify-between transition-all hover:bg-slate-50/50 duration-200 ${
                  idx >= 4 ? "lg:border-t lg:border-slate-100" : ""
                } ${idx % 2 === 1 ? "sm:border-l sm:border-slate-100 lg:border-l-0" : ""} ${
                  idx % 4 !== 0 ? "lg:border-l lg:border-slate-100" : ""
                } ${idx >= 2 && idx < 4 ? "sm:border-t sm:border-slate-100 lg:border-t-0" : ""} ${
                  idx >= 4 && idx < 6 ? "sm:border-t sm:border-slate-100" : ""
                } ${idx >= 6 ? "sm:border-t sm:border-slate-100" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 tracking-wide uppercase">
                    {stat.title}
                  </span>
                  <div className={`p-1.5 rounded-lg ${stat.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="flex items-baseline justify-between mt-2.5">
                  <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-extrabold tracking-wide border ${
                      stat.badgeType === "success"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}
                  >
                    {stat.badge}
                  </span>
                </div>

                <div className="text-[10px] text-slate-400 font-semibold mt-1">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom Grid: RFQ Trends & Enquiry Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* RFQ Trends (2 cols) */}
        <Card className="border-slate-200 lg:col-span-2 select-none shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100/60 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">RFQ Trends</CardTitle>
                <CardDescription className="text-xs text-slate-400 font-medium mt-0.5">
                  Last 6 months • enquiries received
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 bg-slate-100/50 p-0.5 rounded-lg border border-slate-200">
                <button className="px-2.5 py-1 text-[10px] font-bold bg-white text-slate-900 shadow-sm rounded-md">
                  Chart
                </button>
                <button className="px-2.5 py-1 text-[10px] font-bold text-slate-500 hover:text-slate-900">
                  Data
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Visual Simulated Graph bar charts */}
            <div className="flex items-end justify-between h-40 pt-4 px-2 select-none">
              {[
                { label: "Dec", value: 45 },
                { label: "Jan", value: 62 },
                { label: "Feb", value: 85 },
                { label: "Mar", value: 72 },
                { label: "Apr", value: 110 },
                { label: "May", value: 142 },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2 group w-1/8">
                  <div className="relative w-9 bg-slate-100 rounded-lg h-28 flex items-end overflow-hidden border border-slate-200/40">
                    <div
                      style={{ height: `${(item.value / 142) * 100}%` }}
                      className="w-full bg-gradient-to-t from-[#1a2c42] to-[#2b4c74] group-hover:to-[#cbf380] rounded-b-lg transition-all duration-300 relative shadow-inner"
                    >
                      <div className="absolute top-1 inset-x-0 text-[8px] font-bold text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.value}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enquiry Pipeline (1 col) */}
        <Card className="border-slate-200 select-none shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100/60 pb-4">
            <CardTitle className="text-base font-bold text-slate-900">Enquiry Pipeline</CardTitle>
            <CardDescription className="text-xs text-slate-400 font-medium mt-0.5">
              Current outstanding potential value
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col justify-between h-[190px]">
            <div className="text-center">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
                Est. Active Value
              </div>
              <div className="text-4xl font-black text-slate-900 tracking-tight leading-none mt-2.5">
                ₹30.4L
              </div>
              <p className="text-[10px] text-emerald-600 font-bold mt-1.5">
                ▲ +14% vs last week
              </p>
            </div>

            {/* Circular simulated radial progress */}
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-3 mt-4">
              <div className="relative h-10 w-10 shrink-0">
                <svg viewBox="0 0 36 36" className="h-full w-full">
                  <path
                    className="stroke-slate-200"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-[#cbf380]"
                    strokeWidth="3.5"
                    strokeDasharray="75, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-slate-700">
                  75%
                </div>
              </div>
              <div className="leading-tight">
                <div className="text-xs font-bold text-slate-800">Quotes Accepted</div>
                <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  18 out of 24 conversions
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Quick Shortcuts Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Navigation shortcuts */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Steel Operations Dashboard</h3>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-snug">
              Navigate straight to logistics, payment schedules, or configure price rules.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            <Link
              href="/dashboard/price-calculator"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 px-3 hover:bg-slate-50 transition-all text-xs font-bold text-slate-700"
            >
              📊 Price Calc
            </Link>
            <Link
              href="/dashboard/payments"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 px-3 hover:bg-slate-50 transition-all text-xs font-bold text-slate-700"
            >
              💳 Receivables
            </Link>
            <Link
              href="/dashboard/whatsapp-generator"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 px-3 hover:bg-slate-50 transition-all text-xs font-bold text-slate-700"
            >
              💬 WhatsApp
            </Link>
          </div>
        </div>

        {/* Create new actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Quick Enquiries and Quotations</h3>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-snug">
              Rapidly trigger sales cycles by logging inquiries or printing quotation records.
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <Link
              href="/dashboard/new-enquiry"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#1a2c42] hover:bg-[#122031] text-white py-2.5 px-4 text-xs font-bold transition-all shadow-md shadow-[#1a2c42]/10"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Create RFQ</span>
            </Link>
            <Link
              href="/dashboard/quotations"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 py-2.5 px-4 text-xs font-bold text-slate-700 transition-all shadow-sm"
            >
              <ArrowUpRight className="h-4 w-4" />
              <span>View Quotes</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}